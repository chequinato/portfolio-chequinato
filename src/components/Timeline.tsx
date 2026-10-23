import { timeline } from "@/data/career";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";
import { StepHead } from "./StepHead";

// Trajetória como `git log --graph`: a main é a carreira, a faculdade corre
// numa branch paralela desde que começou. Cada marco é um commit, com hash,
// mensagem convencional e refs.

function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export function Timeline() {
  const { ref, cls } = useReveal<HTMLElement>(0.08);
  const rows = [...timeline].reverse();
  // A branch paralela existe do commit que a criou até o topo do log.
  const forkAt = rows.findIndex((m) => m.lane === 1);

  return (
    <section id="trajetoria" ref={ref} className={`sec timeline ${cls}`}>
      <StepHead id="trajetoria" right="2021 → HEAD" />

      <div className="timeline__grid">
        <div className="timeline__intro">
          <h2 className="display display--m rv-cut">
            De 2021 <br />
            até o <em>Itaú.</em>
          </h2>
          <pre className="timeline__cmd mono rv" style={{ ["--i" as string]: 1 }}>
            <span>$</span> git log --graph --oneline{"\n"}
            <span>#</span> {rows.length} commits · 2 branches
          </pre>
        </div>

        <ol className="gitlog">
          {rows.map((m, i) => {
            const onBranch = i < forkAt; // a faixa 1 passa por estas linhas
            const isFork = i === forkAt;
            const first = i === 0;
            const last = i === rows.length - 1;
            return (
              <li
                key={m.title}
                className={`gitlog__row rv ${m.signal ? "is-signal" : ""} ${m.lane === 1 ? "is-branch" : ""}`}
                style={{ ["--i" as string]: i }}
              >
                <div className="gitlog__graph" aria-hidden>
                  {/* faixa 0: main */}
                  {m.lane === 0 ? (
                    <span className={`lane lane--0 ${first ? "from-dot" : ""} ${last ? "to-dot" : ""}`} />
                  ) : (
                    <span className="lane lane--0" />
                  )}
                  {/* faixa 1: faculdade */}
                  {onBranch && <span className="lane lane--1" />}
                  {isFork && (
                    <>
                      <span className="lane lane--1 to-dot" />
                      <span className="fork" />
                    </>
                  )}
                  <span className={`dot dot--${m.lane} ${m.signal ? "dot--head" : ""}`} />
                </div>

                <div className="gitlog__body">
                  <div className="gitlog__line mono">
                    <span className="gitlog__hash">{hash(m.title)}</span>
                    {m.refs?.map((r) => (
                      <span key={r} className={`gitlog__ref ${r.startsWith("HEAD") ? "is-head" : r.startsWith("tag") ? "is-tag" : ""}`}>
                        {r}
                      </span>
                    ))}
                    <span className="gitlog__msg">{m.commit}</span>
                  </div>
                  <div className="gitlog__card">
                    <div className="gitlog__when">
                      <span className="num">{m.year}</span>
                      <span className="mono-label">{m.when}</span>
                    </div>
                    <div>
                      <div className="mono-label gitlog__place">
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
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
