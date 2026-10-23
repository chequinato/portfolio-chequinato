import { timeline } from "@/data/career";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

// Trajetória como livro-razão: ano gigante à esquerda, fio traçado entre
// as entradas, a entrada atual marcada com o sinal.
export function Timeline() {
  const { ref, cls } = useReveal<HTMLElement>(0.1);
  const items = [...timeline].reverse();
  return (
    <section id="trajetoria" ref={ref} className={`sec timeline ${cls}`}>
      <div className="sec-head">
        <span className="idx">06</span>
        <span className="mono-label">Trajetória</span>
        <span className="sec-head__rule rv-rule" />
        <span className="mono-label">2021 → hoje</span>
      </div>

      <div className="timeline__grid">
        <h2 className="display display--m rv-cut timeline__title">
          De 2021 <br />
          até o <em>Itaú.</em>
        </h2>
        <ol className="ledger">
          {items.map((m, i) => (
            <li key={m.title} className={`ledger__row ${m.signal ? "is-signal" : ""}`} style={{ ["--i" as string]: i }}>
              <span className="ledger__rule rv-rule" style={{ ["--i" as string]: i }} />
              <div className="ledger__when rv-cut" style={{ ["--i" as string]: i }}>
                <span className="num">{m.year}</span>
                <span className="mono-label">{m.when}</span>
              </div>
              <div className="ledger__what rv" style={{ ["--i" as string]: i + 1 }}>
                <div className="ledger__place mono-label">
                  {m.current && <span className={`led ${m.signal ? "led--signal" : ""}`} />}
                  {m.place}
                </div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                {m.stack && (
                  <ul className="ledger__stack">
                    {m.stack.map((s) => (
                      <li key={s} className="chip">
                        <TechIcon name={s} size={13} title={false} />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
