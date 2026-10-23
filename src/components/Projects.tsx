import { featured, type Instrument } from "@/data/projects";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";
import { VeroFeed } from "./instruments/VeroFeed";
import { FxPipeline } from "./instruments/FxPipeline";
import { EnergyBars } from "./instruments/EnergyBars";
import { PontoClock } from "./instruments/PontoClock";
import { Backoffice } from "./instruments/Backoffice";

const instruments: Record<Instrument, () => JSX.Element> = {
  vero: VeroFeed,
  fx: FxPipeline,
  energy: EnergyBars,
  ponto: PontoClock,
  backoffice: Backoffice,
};

function Dossier({ p, i }: { p: (typeof featured)[number]; i: number }) {
  const { ref, cls } = useReveal<HTMLElement>(0.12);
  const Inst = instruments[p.instrument];
  return (
    <article ref={ref} className={`dossier ${i % 2 ? "dossier--flip" : ""} ${cls}`} id={`p-${p.id}`}>
      <div className="dossier__text">
        <div className="dossier__meta">
          <span className="idx">{p.code}</span>
          <span className="mono-label">{p.year}</span>
          <span className="mono-label">{p.domain.join(" · ")}</span>
        </div>
        <h3 className="dossier__title rv-cut">{p.title}</h3>
        <p className="dossier__kicker rv" style={{ ["--i" as string]: 1 }}>{p.kicker}</p>
        <p className="dossier__summary rv" style={{ ["--i" as string]: 2 }}>{p.summary}</p>
        <ol className="dossier__points">
          {p.points.map((pt, j) => (
            <li key={pt} className="rv-wipe" style={{ ["--i" as string]: 3 + j }}>
              <span className="mono">{String(j + 1).padStart(2, "0")}</span>
              {pt}
            </li>
          ))}
        </ol>
        <ul className="dossier__stack" aria-label="Tecnologias">
          {p.stack.map((s, j) => (
            <li key={s} className="chip rv" style={{ ["--i" as string]: 6 + j * 0.5 }}>
              <TechIcon name={s} size={14} title={false} />
              {s}
            </li>
          ))}
        </ul>
        <a className="link-arrow" href={p.repo} target="_blank" rel="noreferrer">
          Ver repositório <span aria-hidden>↗</span>
        </a>
      </div>
      <div className="dossier__inst rv-cut" style={{ ["--i" as string]: 2 }}>
        <Inst />
      </div>
    </article>
  );
}

export function Projects() {
  const { ref, cls } = useReveal<HTMLDivElement>();
  return (
    <section id="projetos" className="sec projects">
      <div ref={ref} className={cls}>
        <div className="sec-head">
          <span className="idx">02</span>
          <span className="mono-label">Projetos em destaque</span>
          <span className="sec-head__rule rv-rule" />
          <span className="mono-label">{featured.length} sistemas</span>
        </div>
        <div className="sec-title">
          <h2 className="display rv-cut">
            Sistemas que eu construí <em>e explico.</em>
          </h2>
          <p className="serif-note rv" style={{ ["--i" as string]: 1 }}>
            Print parado não mostra o que um back-end faz. Cada projeto aqui tem um instrumento: uma simulação ao vivo
            do que acontece por dentro — as decisões, as filas, os números.
          </p>
        </div>
      </div>
      {featured.map((p, i) => (
        <Dossier key={p.id} p={p} i={i} />
      ))}
    </section>
  );
}
