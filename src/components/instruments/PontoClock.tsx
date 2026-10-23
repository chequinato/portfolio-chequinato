import { useRef, useState } from "react";
import { Panel, Ticked, rand } from "./Panel";

// Uma semana de estágio passando em velocidade alta. Cada dia mostra o
// expediente sendo preenchido; quinta é dia de prova e a meta cai pela
// metade (Lei 11.788/2008, art. 10). O saldo do banco de horas fecha sozinho.

const days = ["seg", "ter", "qua", "qui", "sex"];
const START = 7 * 60, END = 19 * 60, SPAN = END - START;
const META = 6 * 60;

type Day = { in: number; lunch: number; back: number; out: number; prova: boolean };

function makeWeek(): Day[] {
  return days.map((_, i) => {
    const prova = i === 3;
    const inn = Math.round(rand(8 * 60 + 40, 9 * 60 + 15));
    if (prova) {
      // Meio período direto, sem almoço: sai antes da prova.
      const out = Math.round(inn + META / 2 + rand(-15, 25));
      return { in: inn, lunch: out, back: out, out, prova };
    }
    const lunch = 12 * 60 + Math.round(rand(-10, 10));
    const back = lunch + 60;
    const work = META + rand(-35, 45);
    const out = Math.round(back + (work - (lunch - inn)));
    return { in: inn, lunch, back, out, prova };
  });
}

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.round(m % 60)).padStart(2, "0")}`;
const sign = (m: number) => `${m >= 0 ? "+" : "−"}${hhmm(Math.abs(m))}`;

export function PontoClock() {
  const week = useRef(makeWeek());
  // Tempo simulado: minutos desde segunda 07:00, com cada dia ocupando SPAN.
  const [clock, setClock] = useState(0);
  const total = SPAN * days.length;

  const tick = () =>
    setClock((c) => {
      if (c >= total + SPAN * 0.6) {
        week.current = makeWeek();
        return 0;
      }
      return c + 22;
    });

  const dayIdx = Math.min(days.length - 1, Math.floor(clock / SPAN));
  const nowMin = START + (clock % SPAN);
  let saldo = 0, semana = 0;
  const rows = week.current.map((d, i) => {
    const until = i < dayIdx || clock >= total ? END : i === dayIdx ? nowMin : START;
    const am = Math.max(0, Math.min(until, d.lunch) - d.in);
    const pm = Math.max(0, Math.min(until, d.out) - d.back);
    const worked = am + pm;
    const closed = until >= d.out;
    const meta = d.prova ? META / 2 : META;
    if (closed) saldo += worked - meta;
    semana += worked;
    return { d, until, worked, closed, meta };
  });
  const events = rows.flatMap(({ d, until }, i) =>
    (
      (d.prova
        ? [
            [d.in, "entrada"],
            [d.out, "saída · prova"],
          ]
        : [
            [d.in, "entrada"],
            [d.lunch, "almoço"],
            [d.back, "retorno"],
            [d.out, "saída"],
          ]) as [number, string][]
    )
      .filter(([m]) => m <= until)
      .map(([m, l]) => `${days[i]} ${hhmm(m)} · ${l}`),
  );

  const x = (m: number) => `${((m - START) / SPAN) * 100}%`;
  const w = (a: number, b: number) => `${(Math.max(0, b - a) / SPAN) * 100}%`;

  return (
    <Panel code="IH-04" title="banco de horas · semana" foot={<><span>meta 6h/dia · limite 30h/semana</span><span>Lei 11.788/2008</span></>}>
      {(live) => (
        <Ticked live={live} onTick={tick} ms={110}>
          <div className="ponto">
            <div className="ponto__head">
              <div>
                <span className="inst__k">saldo</span>
                <span className={`inst__v ${saldo < 0 ? "is-neg" : ""}`}>{sign(saldo)}</span>
              </div>
              <div>
                <span className="inst__k">semana</span>
                <span className="inst__v">{hhmm(semana)}<small> / 30:00</small></span>
              </div>
              <div>
                <span className="inst__k">agora</span>
                <span className="inst__v">{clock >= total ? "fechada" : `${days[dayIdx]} ${hhmm(nowMin)}`}</span>
              </div>
            </div>

            <div className="ponto__grid">
              <div className="ponto__scale">
                {[8, 10, 12, 14, 16, 18].map((h) => (
                  <span key={h} style={{ left: x(h * 60) }}>{h}h</span>
                ))}
              </div>
              {rows.map(({ d, until, worked, closed, meta }, i) => (
                <div key={i} className={`ponto__row ${d.prova ? "is-prova" : ""} ${i === dayIdx && clock < total ? "is-today" : ""}`}>
                  <span className="ponto__day">{days[i]}{d.prova && <em>prova</em>}</span>
                  <span className="ponto__track">
                    <span className="ponto__seg" style={{ left: x(d.in), width: w(d.in, Math.min(until, d.lunch)) }} />
                    <span className="ponto__seg" style={{ left: x(d.back), width: w(d.back, Math.min(until, d.out)) }} />
                    <span className="ponto__meta" style={{ left: x(d.in + meta + (d.prova ? 0 : 60)) }} title="meta" />
                    {i === dayIdx && clock < total && <span className="ponto__now" style={{ left: x(nowMin) }} />}
                  </span>
                  <span className={`ponto__sum ${closed ? (worked - meta >= 0 ? "is-pos" : "is-neg") : ""}`}>
                    {closed ? sign(worked - meta) : hhmm(worked)}
                  </span>
                </div>
              ))}
            </div>

            <ol className="ponto__log">
              {events.slice(-3).map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ol>
          </div>
        </Ticked>
      )}
    </Panel>
  );
}
