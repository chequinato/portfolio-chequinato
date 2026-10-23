import { useRef, useState } from "react";
import { Panel, Ticked, rand, pick, brl } from "./Panel";

// Simula o fluxo do Vero: cada transação chega, as regras síncronas decidem
// na hora (200 ou 403) e as duvidosas entram como 202 na fila. Um "worker"
// reavalia as da fila com o score do modelo e o corte de política em 70%.

type Status = "aprovada" | "suspeita" | "bloqueada";
type Tx = { id: string; amount: number; channel: string; score: number; status: Status; http: number; why: string; fresh: boolean; resolvedAt?: number };

const channels = ["pix", "cartão", "ted", "boleto"];
const reasons = ["velocidade: 7 tx/min", "valor 14× a média", "país ≠ emissor", "dispositivo novo + madrugada", "conta destino recém-criada"];

function makeTx(): Tx {
  const r = Math.random();
  const score = r < 0.62 ? rand(0.02, 0.4) : r < 0.86 ? rand(0.45, 0.82) : rand(0.86, 0.99);
  const status: Status = score >= 0.85 ? "bloqueada" : score >= 0.45 ? "suspeita" : "aprovada";
  return {
    id: "tx_" + Math.random().toString(16).slice(2, 7),
    amount: score > 0.8 ? rand(2500, 19000) : rand(12, 1800),
    channel: pick(channels),
    score,
    status,
    http: status === "bloqueada" ? 403 : status === "suspeita" ? 202 : 200,
    why: status === "bloqueada" ? "regra síncrona · " + pick(reasons) : status === "suspeita" ? "→ fila SQS" : "regras ok",
    fresh: true,
  };
}

export function VeroFeed() {
  const rows = useRef<Tx[]>(Array.from({ length: 5 }, () => ({ ...makeTx(), fresh: false })));
  const totals = useRef({ total: 1284, aprovada: 1102, suspeita: 0, bloqueada: 96 });
  const [, force] = useState(0);

  return (
    <Panel
      code="VR-01"
      title="decisões em tempo real"
      foot={
        <>
          <span>POST /webhooks/transacoes</span>
          <span>HMAC ✓ · rate limit 120/min</span>
        </>
      }
    >
      {(live) => (
        <Ticked
          live={live}
          onTick={() => {
            const now = Date.now();
            const tot = totals.current;
            // Worker: resolve parte das suspeitas que estão na fila.
            const next = rows.current.map((t) => {
              if (t.status === "suspeita" && !t.resolvedAt && Math.random() < 0.55) {
                const ml = Math.min(0.99, t.score + rand(-0.25, 0.25));
                const blocked = ml >= 0.7;
                tot.suspeita = Math.max(0, tot.suspeita - 1);
                tot[blocked ? "bloqueada" : "aprovada"]++;
                return {
                  ...t,
                  fresh: false,
                  resolvedAt: now,
                  status: (blocked ? "bloqueada" : "aprovada") as Status,
                  why: `worker · modelo ${(ml * 100).toFixed(0)}% ${blocked ? "≥" : "<"} 70%`,
                };
              }
              return { ...t, fresh: false };
            });
            const tx = makeTx();
            tot.total++;
            tot[tx.status]++;
            rows.current = [tx, ...next].slice(0, 7);
            force((n) => n + 1);
          }}
        >
          <div className="vero">
            <div className="vero__totals">
              {(["total", "aprovada", "suspeita", "bloqueada"] as const).map((k) => (
                <div key={k} className={`vero__total vero__total--${k}`}>
                  <span className="inst__k">{k === "total" ? "recebidas" : k === "suspeita" ? "na fila" : k + "s"}</span>
                  <span className="inst__v">{totals.current[k].toLocaleString("pt-BR")}</span>
                </div>
              ))}
            </div>
            <ul className="vero__list">
              {rows.current.map((t) => (
                <li key={t.id} className={`vero__row is-${t.status} ${t.fresh ? "is-fresh" : ""} ${t.resolvedAt ? "is-resolved" : ""}`}>
                  <span className="vero__id">{t.id}</span>
                  <span className="vero__ch">{t.channel}</span>
                  <span className="vero__amt">R$ {brl(t.amount)}</span>
                  <span className="vero__score" title={`score ${(t.score * 100).toFixed(0)}`}>
                    <span style={{ transform: `scaleX(${t.score})` }} />
                  </span>
                  <span className="vero__http">{t.http}</span>
                  <span className="vero__chip">{t.status}</span>
                  <span className="vero__why">{t.why}</span>
                </li>
              ))}
            </ul>
          </div>
        </Ticked>
      )}
    </Panel>
  );
}
