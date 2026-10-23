import { useRef, useState } from "react";
import { Panel, Ticked, rand, brl } from "./Panel";

// Ciclo do Energy Processor: upload → validação → cálculo → gráfico.
// Cada fase dura alguns ticks; o ciclo recomeça com outra planilha.

const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const files = ["consumo_2026.csv", "fabrica_jundiai.xlsx", "filial_sp.csv", "medicoes_q3.xlsx"];
const checks = ["formato", "tamanho < 10 MB", "colunas obrigatórias", "datas e valores"];
const TARIFA = 0.82;

function makeData() {
  const base = rand(900, 1600);
  return months.map((_, i) => Math.round(base * (1 + 0.28 * Math.sin((i / 12) * Math.PI * 2 + 1.2) + rand(-0.12, 0.12))));
}

export function EnergyBars() {
  const [t, setT] = useState(0);
  const data = useRef(makeData());
  const file = useRef(files[0]);

  const tick = () => {
    setT((x) => {
      if (x >= 26) {
        data.current = makeData();
        file.current = files[(files.indexOf(file.current) + 1) % files.length];
        return 0;
      }
      return x + 1;
    });
  };

  const upload = Math.min(1, t / 4);
  const checked = Math.max(0, Math.min(checks.length, t - 4));
  const chart = t >= 9;
  const max = Math.max(...data.current);
  const total = data.current.reduce((a, b) => a + b, 0);
  const peak = data.current.indexOf(max);

  return (
    <Panel code="EN-03" title="processamento de planilha" foot={<><span>POST /upload → 201</span><span>cache redis: {t > 12 ? "hit" : "miss"}</span></>}>
      {(live) => (
        <Ticked live={live} onTick={tick} ms={420}>
          <div className="energy">
            <div className="energy__steps">
              <div className="energy__file">
                <span className="inst__k">arquivo</span>
                <span className="energy__name">{file.current}</span>
                <span className="energy__bar"><span style={{ transform: `scaleX(${upload})` }} /></span>
                <span className="inst__k">{Math.round(upload * 100)}%</span>
              </div>
              <ul className="energy__checks">
                {checks.map((c, i) => (
                  <li key={c} className={i < checked ? "is-ok" : ""}>
                    <span>{i < checked ? "✓" : "·"}</span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="energy__totals">
                <div>
                  <span className="inst__k">consumo anual</span>
                  <span className="inst__v">{chart ? total.toLocaleString("pt-BR") : "—"} <small>kWh</small></span>
                </div>
                <div>
                  <span className="inst__k">custo estimado</span>
                  <span className="inst__v">{chart ? "R$ " + brl(total * TARIFA) : "—"}</span>
                </div>
              </div>
            </div>
            <div className={`energy__chart ${chart ? "is-on" : ""}`} role="img" aria-label="Consumo mensal em kWh">
              {data.current.map((v, i) => (
                <div key={i} className={`energy__col ${i === peak ? "is-peak" : ""}`} style={{ ["--i" as string]: i }}>
                  <span className="energy__v">{i === peak && chart ? v : ""}</span>
                  <span className="energy__box">
                    <span className="energy__fill" style={{ height: `${(v / max) * 100}%` }} />
                  </span>
                  <span className="energy__m">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Ticked>
      )}
    </Panel>
  );
}
