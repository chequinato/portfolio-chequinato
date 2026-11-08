import { useState } from "react";
import { featured, archive, type Featured } from "@/data/projects";
import { postUrl } from "@/data/linkedin";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";
import { SectionHead } from "./SectionHead";

const MAX_CHIPS = 5;

function Chips({ stack }: { stack: string[] }) {
  const shown = stack.slice(0, MAX_CHIPS);
  const rest = stack.length - shown.length;
  return (
    <ul className="chips">
      {shown.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
      {rest > 0 && <li className="chip chip--more">+{rest}</li>}
    </ul>
  );
}

function ProjectCard({ p, wide, i }: { p: Featured; wide?: boolean; i: number }) {
  const cover = p.shots?.[0];
  return (
    <article className={`card project ${wide ? "project--wide" : ""} fade`} style={{ ["--d" as string]: i % 3 }}>
      <a className="project__media" href={p.repo} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden>
        {cover ? (
          <img src={cover} alt="" loading="lazy" />
        ) : (
          <span className="project__placeholder">
            <TechIcon name={p.stack[0]} size={44} title={false} />
          </span>
        )}
      </a>
      <div className="project__body">
        <span className="project__kicker">
          {p.kicker} · {p.year}
        </span>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__summary">{p.summary}</p>
        <Chips stack={p.stack} />
        <div className="project__links">
          <a href={p.repo} target="_blank" rel="noreferrer" className="link">
            ver código <span aria-hidden>↗</span>
          </a>
          {p.post && (
            <a href={postUrl(p.post)} target="_blank" rel="noreferrer" className="link link--muted">
              publicação <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { ref, cls } = useReveal<HTMLElement>(0.05);
  const [all, setAll] = useState(false);
  const list = all ? archive : archive.slice(0, 6);

  return (
    <section id="projetos" ref={ref} className={`section container ${cls}`}>
      <SectionHead
        center
        eyebrow="projetos"
        title={
          <>
            Coisas que eu <span className="accent">construí</span>
          </>
        }
        intro="Uma seleção do que melhor mostra como eu trabalho hoje — o código de todos está aberto no GitHub."
      />

      <div className="projects">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} p={p} wide={i === 0} i={i} />
        ))}
      </div>

      <div className="more">
        <h3 className="more__title">Outros projetos</h3>
        <ul className="mini-grid">
          {list.map((p) => (
            <li key={p.id}>
              <a className="card mini" href={p.live ?? p.repo} target="_blank" rel="noreferrer">
                <div className="mini__top">
                  <span className="mini__kind">{p.kind}</span>
                  <span className="mini__year">{p.year}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.summary}</p>
                <span className="mini__stack">{p.stack.slice(0, 3).join(" · ")}</span>
              </a>
            </li>
          ))}
        </ul>
        {archive.length > 6 && (
          <button className="btn btn--ghost more__toggle" onClick={() => setAll((a) => !a)}>
            {all ? "mostrar menos" : `ver todos (${archive.length})`}
          </button>
        )}
      </div>
    </section>
  );
}
