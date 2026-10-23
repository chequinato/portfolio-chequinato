import { StepHead } from "./StepHead";
import { useState } from "react";
import { featured, type Instrument } from "@/data/projects";
import { postUrl } from "@/data/linkedin";
import { Lightbox } from "./Archive";
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
  const [open, setOpen] = useState<number | null>(null);
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
        {p.shots && p.shots.length > 0 && (
          <div className="evidence">
            <span className="mono-label">evidências · prints publicados</span>
            <div className="evidence__row">
              {p.shots.map((src, j) => (
                <button key={src} className="evidence__shot" onClick={() => setOpen(j)} aria-label={`Abrir print ${j + 1} de ${p.title}`}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="dossier__links">
          <a className="link-arrow" href={p.repo} target="_blank" rel="noreferrer">
            Ver repositório <span aria-hidden>↗</span>
          </a>
          {p.post && (
            <a className="link-arrow link-arrow--quiet" href={postUrl(p.post)} target="_blank" rel="noreferrer">
              Publicação <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
      {open !== null && p.shots && (
        <Lightbox p={{ title: p.title, kind: p.kicker, summary: p.summary, images: p.shots }} start={open} onClose={() => setOpen(null)} />
      )}
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
        <StepHead id="projetos" right={`${featured.length} sistemas`} />
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
