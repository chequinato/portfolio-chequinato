import { useRef, useState } from "react";
import { Panel, Ticked, rand } from "./Panel";

// Reproduz uma execução do FX Lambda passo a passo: o EventBridge acorda a
// Lambda, ela busca a credencial, chama as duas APIs, processa, grava no S3
// e loga. Depois o lado de leitura: API Gateway → Lambda de consulta → S3.

type Node = { id: string; label: string; sub: string; x: number; y: number };
const nodes: Node[] = [
  { id: "eb", label: "EventBridge", sub: "cron 08:00 UTC", x: 14, y: 34 },
  { id: "fn", label: "λ processor", sub: "python 3.12", x: 196, y: 34 },
  { id: "sm", label: "Secrets Mgr", sub: "KMS", x: 196, y: 128 },
  { id: "a1", label: "API hoje", sub: "live rates", x: 378, y: 4 },
  { id: "a2", label: "API ontem", sub: "historical", x: 378, y: 64 },
  { id: "s3", label: "S3", sub: "relatórios", x: 378, y: 160 },
  { id: "gw", label: "API Gateway", sub: "HTTP v2", x: 14, y: 210 },
  { id: "q", label: "λ query", sub: "read-only", x: 196, y: 210 },
];
const W = 124, H = 40;
const at = (id: string) => nodes.find((n) => n.id === id)!;

type Step = { edge: [string, string]; log: string; warn?: boolean };

function makeRun(): { steps: Step[]; rates: { pair: string; v: number; d: number }[] } {
  const rates = [
    { pair: "USD/BRL", v: rand(5.2, 5.7), d: rand(-0.9, 0.9) },
    { pair: "EUR/BRL", v: rand(5.9, 6.3), d: rand(-1.6, 1.6) },
    { pair: "GBP/BRL", v: rand(6.8, 7.3), d: rand(-0.8, 0.8) },
    { pair: "JPY/BRL", v: rand(0.034, 0.038), d: rand(-1.4, 1.4) },
  ];
  const alerts = rates.filter((r) => Math.abs(r.d) >= 1);
  const ms = Math.round(rand(640, 980));
  const steps: Step[] = [
    { edge: ["eb", "fn"], log: "START · gatilho agendado" },
    { edge: ["fn", "sm"], log: "secrets: chave obtida (KMS decrypt)" },
    { edge: ["fn", "a1"], log: "GET /latest/BRL → 200 · 162 moedas" },
    { edge: ["fn", "a2"], log: "GET /historical → 200" },
    { edge: ["fn", "fn"], log: `processor: ${rates.length} pares · ${alerts.length} alerta(s)`, warn: alerts.length > 0 },
    { edge: ["fn", "s3"], log: `PUT s3://fx-reports/${new Date().toISOString().slice(0, 10)}.json` },
    { edge: ["fn", "fn"], log: `END · ${ms} ms · 128 MB` },
    { edge: ["gw", "q"], log: "GET /reports/latest" },
    { edge: ["q", "s3"], log: "query: lê o último relatório → 200" },
  ];
  return { steps, rates };
}

export function FxPipeline() {
  const run = useRef(makeRun());
  const [step, setStep] = useState(-1);
  const [log, setLog] = useState<{ t: string; m: string; warn?: boolean }[]>([]);

  const tick = () => {
    const next = step + 1;
    if (next >= run.current.steps.length + 2) {
      run.current = makeRun();
      setStep(-1);
      setLog([]);
      return;
    }
    setStep(next);
    const s = run.current.steps[next];
    if (s) {
      const t = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLog((l) => [...l, { t, m: s.log, warn: s.warn }].slice(-5));
    }
  };

  const cur = run.current.steps[step];
  const active = new Set(cur ? cur.edge : []);
  const done = new Set(run.current.steps.slice(0, Math.max(0, step + 1)).flatMap((s) => s.edge));
  const showRates = step >= 4;

  const edges: [string, string][] = [["eb", "fn"], ["fn", "sm"], ["fn", "a1"], ["fn", "a2"], ["fn", "s3"], ["gw", "q"], ["q", "s3"]];

  return (
    <Panel code="FX-02" title="execução diária" foot={<><span>região sa-east-1</span><span>terraform apply ✓</span></>}>
      {(live) => (
        <Ticked live={live} onTick={tick} ms={900}>
          <div className="fx">
            <svg viewBox="0 0 506 254" className="fx__map" role="img" aria-label="Arquitetura do FX Lambda">
              {edges.map(([a, b]) => {
                const A = at(a), B = at(b);
                const x1 = A.x + W, y1 = A.y + H / 2;
                const x2 = B.x, y2 = B.y + H / 2;
                const vertical = A.x === B.x;
                const d = vertical
                  ? `M${A.x + W / 2},${A.y + H} L${B.x + W / 2},${B.y}`
                  : `M${x1},${y1} C${x1 + 30},${y1} ${x2 - 30},${y2} ${x2},${y2}`;
                const on = cur && cur.edge[0] === a && cur.edge[1] === b;
                return <path key={a + b} d={d} className={`fx__edge ${on ? "is-on" : ""} ${done.has(a) && done.has(b) ? "is-done" : ""}`} />;
              })}
              {nodes.map((n) => (
                <g key={n.id} className={`fx__node ${active.has(n.id) ? "is-on" : ""} ${done.has(n.id) ? "is-done" : ""}`} transform={`translate(${n.x},${n.y})`}>
                  <rect width={W} height={H} />
                  <text x="8" y="17" className="fx__label">{n.label}</text>
                  <text x="8" y="31" className="fx__sub">{n.sub}</text>
                </g>
              ))}
            </svg>

            <div className="fx__bottom">
              <ol className="fx__log">
                {log.map((l, i) => (
                  <li key={l.t + i} className={l.warn ? "is-warn" : ""}>
                    <span>{l.t}</span>
                    {l.m}
                  </li>
                ))}
                <li className="fx__caret" aria-hidden>▍</li>
              </ol>
              <table className={`fx__rates ${showRates ? "is-on" : ""}`}>
                <tbody>
                  {run.current.rates.map((r) => (
                    <tr key={r.pair} className={Math.abs(r.d) >= 1 ? "is-alert" : ""}>
                      <td>{r.pair}</td>
                      <td>{r.v < 1 ? r.v.toFixed(4) : r.v.toFixed(3)}</td>
                      <td>{(r.d > 0 ? "+" : "") + r.d.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Ticked>
      )}
    </Panel>
  );
}
