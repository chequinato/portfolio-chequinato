import { useMemo, useState } from "react";
import { useGithub, eventLabel, calendarStats } from "@/lib/github";
import { relTime, useReveal } from "@/lib/hooks";
import { links } from "@/data/profile";
import { Counter } from "./Counter";

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// Faixa invertida com o GitHub ao vivo: contribuições do ano em mapa de
// calor (abre em onda diagonal), números que rolam e o feed de eventos.
export function GithubBand() {
  const gh = useGithub();
  const { ref, cls, inView } = useReveal<HTMLElement>(0.12);
  const [tip, setTip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const stats = useMemo(() => calendarStats(gh.days), [gh.days]);
  const today = new Date().toISOString().slice(0, 10);

  // Organiza em semanas (colunas) começando no domingo, como o GitHub.
  const weeks = useMemo(() => {
    const days = gh.days as [string, number, number][];
    if (!days.length) return [];
    const first = new Date(days[0][0] + "T12:00:00").getDay();
    const cells: ([string, number, number] | null)[] = [...Array(first).fill(null), ...days];
    const out: (typeof cells)[] = [];
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [gh.days]);

  const monthStarts = weeks.map((w) => {
    const d = w.find((c) => c && c[0].endsWith("-01"));
    return d ? MONTHS[Number(d[0].slice(5, 7)) - 1] : "";
  });

  return (
    <section id="github" ref={ref} className={`band gh ${cls}`}>
      <div className="band__inner">
        <div className="sec-head sec-head--zone">
          <span className="idx">05</span>
          <span className="mono-label">GitHub · ao vivo</span>
          <span className="sec-head__rule rv-rule" />
          <span className="mono-label gh__sync">
            <span className={`led ${gh.live ? "" : "led--amber"}`} />
            {gh.live ? `sincronizado ${relTime(gh.syncedAt)}` : `snapshot do build · ${relTime(gh.takenAt)}`}
          </span>
        </div>

        <div className="gh__top">
          <div className="gh__big">
            <Counter value={gh.total} run={inView} className="num gh__total" />
            <span className="mono-label">contribuições em {gh.year}</span>
          </div>
          <dl className="gh__stats">
            {[
              [stats.active, "dias com commit"],
              [stats.best, "maior sequência (dias)"],
              [stats.busiest.count, `recorde num dia${stats.busiest.date ? " · " + stats.busiest.date.slice(8, 10) + "/" + stats.busiest.date.slice(5, 7) : ""}`],
              [gh.user.repos, "repositórios públicos"],
            ].map(([v, l], i) => (
              <div key={String(l)}>
                <dt><Counter value={Number(v)} run={inView} className="num" delay={200 + i * 120} /></dt>
                <dd className="mono-label">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="heat" onMouseLeave={() => setTip(null)}>
          <div className="heat__months mono" aria-hidden>
            {monthStarts.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
          <div className="heat__grid" role="img" aria-label={`${gh.total} contribuições em ${gh.year}`}>
            {weeks.map((w, wi) => (
              <div key={wi} className="heat__week">
                {w.map((c, di) =>
                  c ? (
                    <span
                      key={di}
                      className={`heat__cell l${c[2]} ${c[0] > today ? "is-future" : ""} ${c[0] === today ? "is-today" : ""}`}
                      style={{ ["--d" as string]: `${(wi + di) * 14}ms` }}
                      onMouseEnter={(e) => {
                        const r = (e.target as HTMLElement).getBoundingClientRect();
                        setTip({ date: c[0], count: c[1], x: r.left + r.width / 2, y: r.top });
                      }}
                    />
                  ) : (
                    <span key={di} className="heat__cell is-pad" />
                  ),
                )}
              </div>
            ))}
          </div>
          <div className="heat__legend mono-label" aria-hidden>
            menos
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={`heat__cell l${l}`} />
            ))}
            mais
          </div>
        </div>
        {tip && (
          <div className="heat__tip mono" style={{ left: tip.x, top: tip.y }}>
            <strong>{tip.count}</strong> {tip.count === 1 ? "contribuição" : "contribuições"} ·{" "}
            {new Date(tip.date + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
          </div>
        )}

        <div className="gh__bottom">
          <a className="gh__card" href={links.github} target="_blank" rel="noreferrer">
            <img src={gh.user.avatar} alt="" width={56} height={56} loading="lazy" />
            <div>
              <div className="gh__name">{gh.user.name}</div>
              <div className="mono gh__login">@chequinato · {gh.user.location}</div>
              <p>{gh.user.bio}</p>
              <div className="mono-label">
                {gh.user.followers} seguidores · {gh.user.repos} repositórios · abrir perfil ↗
              </div>
            </div>
          </a>
          <ol className="gh__feed">
            <li className="mono-label gh__feed-head">atividade recente</li>
            {gh.events.slice(0, 6).map((e, i) => {
              const l = eventLabel(e);
              return (
                <li key={e.at + i} className="rv-wipe" style={{ ["--i" as string]: i }}>
                  <span className="gh__verb mono">{l.verb}</span>
                  <a href={`${links.github}/${e.repo}`} target="_blank" rel="noreferrer">{e.repo}</a>
                  <span className="mono gh__when">{relTime(e.at)}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
