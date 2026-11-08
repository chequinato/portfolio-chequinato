import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { featured, type Featured } from "@/data/projects";
import { postUrl } from "@/data/linkedin";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";
import { ProjectMock } from "./ProjectMock";
import { RevealTitle } from "./RevealTitle";
import { StatusIcon } from "./StatusIcon";
import { JobHead } from "./JobHead";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/* -------------------------------------------------------------------------
   Card do carrossel: só imagem, número, título e uma linha.
   ------------------------------------------------------------------------- */
function Card({ p, i, onOpen }: { p: Featured; i: number; onOpen: () => void }) {
  return (
    <li className="pcard pop" style={{ ["--d" as string]: i + 1 }}>
      <button className="pcard__btn" onClick={onOpen} aria-label={`Abrir detalhes de ${p.title}`}>
        <span className="pcard__media">
          <ProjectMock kind={p.instrument} />
          <span className={`run-pill ${p.wip ? "run-pill--run" : ""}`}>
            <StatusIcon s={p.wip ? "running" : "success"} size={14} />
            {p.wip ? "em andamento" : "concluído"}
          </span>
          <span className="pcard__hover">
            <span className="pcard__plus" aria-hidden>
              +
            </span>
            ver projeto
          </span>
        </span>
        <span className="pcard__body">
          <span className="pcard__num">{pad(i)}</span>
          <span className="pcard__title">{p.title}</span>
          <span className="pcard__kicker">{p.kicker}</span>
        </span>
      </button>
    </li>
  );
}

/* -------------------------------------------------------------------------
   Um projeto dentro do pop-up. A chave (p.id) remonta o componente a cada
   troca, e isso dispara a animação de entrada na direção certa.
   ------------------------------------------------------------------------- */
// Mini-pipeline do projeto: os passos rodam em sequência quando o slide
// aparece. Projeto em andamento para no deploy, ainda rodando.
const steps = ["checkout", "build", "test", "deploy"];

function MiniRun({ wip }: { wip?: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((n) => (n >= steps.length ? n : n + 1)), 420);
    return () => clearInterval(t);
  }, []);
  return (
    <ol className="minirun" aria-label="Pipeline do projeto">
      {steps.map((st, i) => {
        const last = i === steps.length - 1;
        const s = i < phase && !(wip && last) ? "success" : i <= phase ? "running" : "queued";
        return (
          <li key={st} className={`minirun__step minirun__step--${s}`}>
            <span className="minirun__icon" key={s}>
              <StatusIcon s={s} size={13} />
            </span>
            <code>{st}</code>
          </li>
        );
      })}
    </ol>
  );
}

function Slide({ p, dir }: { p: Featured; dir: 1 | -1 }) {
  const shots = p.shots ?? [];
  // -1 = demonstração animada; 0..n = prints reais do projeto.
  const [view, setView] = useState(-1);

  return (
    <div className={`slide ${dir === 1 ? "slide--next" : "slide--prev"}`}>
      <div className="slide__left">
        <div className="slide__media">
          {view < 0 ? (
            <ProjectMock kind={p.instrument} />
          ) : (
            <img key={view} src={shots[view]} alt={`Captura de tela do ${p.title}`} className="slide__img" />
          )}
        </div>
        {shots.length > 0 && (
          <div className="slide__thumbs">
            <button className={view < 0 ? "is-on" : ""} onClick={() => setView(-1)}>
              demo
            </button>
            {shots.map((s, i) => (
              <button key={s} className={view === i ? "is-on" : ""} onClick={() => setView(i)} aria-label={`Print ${i + 1}`}>
                <img src={s} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="slide__body">
        <span className="slide__kicker">
          {p.kicker}
          {p.wip && (
            <span className="run-pill run-pill--run run-pill--inline">
              <StatusIcon s="running" size={13} /> em andamento
            </span>
          )}
        </span>
        <h3 className="slide__title">{p.title}</h3>
        <MiniRun wip={p.wip} />

        <dl className="story">
          <div>
            <dt>Problema</dt>
            <dd>{p.story.problema}</dd>
          </div>
          <div>
            <dt>Solução</dt>
            <dd>{p.story.solucao}</dd>
          </div>
          <div>
            <dt>Resultado</dt>
            <dd>{p.story.resultado}</dd>
          </div>
        </dl>

        <ul className="slide__stack">
          {p.stack.slice(0, 7).map((t) => (
            <li key={t} title={t}>
              <TechIcon name={t} size={15} title={false} />
              {t}
            </li>
          ))}
        </ul>

        <div className="slide__links">
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
            Ver código
          </a>
          {p.post && (
            <a href={postUrl(p.post)} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
              Publicação
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Modal({ start, onClose }: { start: number; onClose: () => void }) {
  const [state, setState] = useState({ i: start, dir: 1 as 1 | -1 });
  const [closing, setClosing] = useState(false);
  const touch = useRef<number | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const n = featured.length;

  const go = useCallback((dir: 1 | -1) => setState((s) => ({ i: (s.i + dir + n) % n, dir })), [n]);
  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 260);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, go]);

  // Volta o scroll do painel para o topo a cada projeto (útil no celular).
  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [state.i]);

  const p = featured[state.i];

  return createPortal(
    <div className={`modal ${closing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="modal__backdrop" onClick={close} />

      <button className="modal__arrow modal__arrow--prev" onClick={() => go(-1)} aria-label="Projeto anterior">
        ←
      </button>

      <div
        ref={panel}
        tabIndex={-1}
        className="modal__panel"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="modal__top">
          <span className="modal__count">
            <strong>{pad(state.i)}</strong> / {pad(n - 1)}
          </span>
          <span className="modal__bar">
            <span style={{ width: `${((state.i + 1) / n) * 100}%` }} />
          </span>
          <button className="modal__close" onClick={close} aria-label="Fechar">
            ✕
          </button>
        </div>

        <Slide key={p.id} p={p} dir={state.dir} />

        <div className="modal__nav-mobile">
          <button onClick={() => go(-1)} aria-label="Projeto anterior">
            ← anterior
          </button>
          <button onClick={() => go(1)} aria-label="Próximo projeto">
            próximo →
          </button>
        </div>
      </div>

      <button className="modal__arrow modal__arrow--next" onClick={() => go(1)} aria-label="Próximo projeto">
        →
      </button>
    </div>,
    document.body,
  );
}

/* -------------------------------------------------------------------------
   Seção
   ------------------------------------------------------------------------- */
export function Projects() {
  const { ref, cls } = useReveal<HTMLElement>(0.1);
  const track = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const slide = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".pcard");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 24), behavior: "smooth" });
  };

  return (
    <section id="projetos" ref={ref} className={`section projects ${cls}`}>
      <div className="container projects__head">
        <div>
          <JobHead id="projetos" label="projetos" />
          <RevealTitle text="O que eu" accent="construí." />
        </div>
        <div className="projects__arrows fade" style={{ ["--d" as string]: 2 }}>
          <button onClick={() => slide(-1)} aria-label="Anterior" disabled={progress <= 0.01}>
            ←
          </button>
          <button onClick={() => slide(1)} aria-label="Próximo" disabled={progress >= 0.99}>
            →
          </button>
        </div>
      </div>

      <ul ref={track} className="track" onScroll={onScroll}>
        {featured.map((p, i) => (
          <Card key={p.id} p={p} i={i} onOpen={() => setOpen(i)} />
        ))}
      </ul>

      <div className="container">
        <div className="track__progress">
          <span style={{ transform: `scaleX(${0.2 + progress * 0.8})` }} />
        </div>
      </div>

      {open !== null && <Modal start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
