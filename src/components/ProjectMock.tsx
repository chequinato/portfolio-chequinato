import type { ReactNode } from "react";
import type { Instrument } from "@/data/projects";

// Mini-interfaces animadas que servem de capa para cada projeto: mostram
// o que o sistema faz em vez de um print de código. Tudo é CSS — nada
// roda em JavaScript depois de montado.

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="win">
      <div className="win__bar">
        <span />
        <span />
        <span />
        <em>{title}</em>
      </div>
      <div className="win__body">{children}</div>
    </div>
  );
}

const tx = [
  { id: "tx_7c9d", kind: "pix", v: "1.734,69", s: "ok" },
  { id: "tx_f99d", kind: "cartão", v: "11.180,80", s: "warn" },
  { id: "tx_210d", kind: "ted", v: "748,07", s: "ok" },
  { id: "tx_9c8a", kind: "pix", v: "24.064,93", s: "block" },
  { id: "tx_e8fd", kind: "cartão", v: "436,69", s: "ok" },
];
const label = { ok: "aprovada", warn: "em análise", block: "bloqueada" } as const;

function Vero() {
  const rows = [...tx, ...tx];
  return (
    <Window title="transações · ao vivo">
      <div className="vero">
        <ul className="vero__list">
          {rows.map((t, i) => (
            <li key={i}>
              <span className="vero__id">{t.id}</span>
              <span className="vero__kind">{t.kind}</span>
              <span className="vero__v">R$ {t.v}</span>
              <span className={`tag tag--${t.s}`}>{label[t.s as keyof typeof label]}</span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

function Fx() {
  const pairs = [
    { p: "USD/BRL", v: "5,472", d: "+0,18%", up: true },
    { p: "EUR/BRL", v: "5,941", d: "−0,09%", up: false },
    { p: "GBP/BRL", v: "6,954", d: "+0,32%", up: true },
  ];
  return (
    <Window title="câmbio · 08:00 UTC">
      <div className="fx">
        <svg className="fx__spark" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden>
          <path d="M0 45 L20 40 L40 44 L60 30 L80 34 L100 22 L120 28 L140 16 L160 20 L180 10 L200 14" />
        </svg>
        <ul className="fx__rows">
          {pairs.map((x, i) => (
            <li key={x.p} style={{ ["--i" as string]: i }}>
              <span>{x.p}</span>
              <strong>{x.v}</strong>
              <em className={x.up ? "up" : "down"}>{x.d}</em>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

function Energy() {
  const bars = [42, 64, 50, 88, 58, 76, 95];
  return (
    <Window title="consumo · kWh">
      <div className="energy">
        <div className="energy__kpi">
          <strong>4.354</strong>
          <span>kWh no mês</span>
        </div>
        <div className="energy__bars">
          {bars.map((h, i) => (
            <span key={i} style={{ ["--h" as string]: `${h}%`, ["--i" as string]: i }} />
          ))}
        </div>
      </div>
    </Window>
  );
}

function Ponto() {
  return (
    <Window title="banco de horas">
      <div className="ponto">
        <svg viewBox="0 0 100 100" className="ponto__ring" aria-hidden>
          <circle cx="50" cy="50" r="42" />
          <circle cx="50" cy="50" r="42" className="ponto__fill" />
        </svg>
        <div className="ponto__info">
          <span>saldo</span>
          <strong>+02:15</strong>
          <span className="ponto__btn">bater ponto</span>
        </div>
      </div>
    </Window>
  );
}

function Backoffice() {
  return (
    <Window title="pagamentos">
      <div className="bo">
        <div className="bo__order">
          <span className="bo__ticker">PETR4</span>
          <span className="bo__qty">15 ações · R$ 450,00</span>
          <span className="bo__status">
            <i className="tag tag--warn">pendente</i>
            <i className="tag tag--ok">executado</i>
          </span>
        </div>
        <div className="bo__track">
          <span />
        </div>
        <div className="bo__order bo__order--dim">
          <span className="bo__ticker">VALE3</span>
          <span className="bo__qty">30 ações · R$ 300,00</span>
          <span className="tag tag--ok">executado</span>
        </div>
      </div>
    </Window>
  );
}

function Reembolso() {
  const steps = ["validação", "aprovação", "aprovado", "pago"];
  return (
    <Window title="POST /v1/reembolsos">
      <div className="rb">
        <div className="rb__head">
          <span className="rb__id">#RB-4821 · Uber</span>
          <strong>R$ 189,90</strong>
        </div>
        <ol className="rb__steps">
          {steps.map((st, i) => (
            <li key={st} style={{ ["--i" as string]: i }}>
              <span className="rb__dot" />
              <em>{st}</em>
            </li>
          ))}
        </ol>
        <ul className="rb__log">
          <li style={{ ["--i" as string]: 0 }}>
            <b>webhook</b> reembolso.validado <i>200</i>
          </li>
          <li style={{ ["--i" as string]: 1 }}>
            <b>webhook</b> reembolso.aprovado <i>200</i>
          </li>
          <li style={{ ["--i" as string]: 2 }}>
            <b>webhook</b> reembolso.pago <i>200</i>
          </li>
        </ul>
      </div>
    </Window>
  );
}

const map: Record<Instrument, () => JSX.Element> = {
  reembolso: Reembolso,
  vero: Vero,
  fx: Fx,
  energy: Energy,
  ponto: Ponto,
  backoffice: Backoffice,
};

export function ProjectMock({ kind }: { kind: Instrument }) {
  const M = map[kind];
  return (
    <div className="mock" aria-hidden>
      <M />
    </div>
  );
}
