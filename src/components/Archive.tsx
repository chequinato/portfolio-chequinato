import { StepHead } from "./StepHead";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { archive, type Archived } from "@/data/projects";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

// O acervo em índice denso. No desktop, passar o mouse numa linha faz a
// captura de tela seguir o cursor; clicar abre a galeria em tela cheia.

export function Archive() {
  const { ref, cls } = useReveal<HTMLElement>(0.08);
  const [filter, setFilter] = useState<string>("Todos");
  const [hover, setHover] = useState<Archived | null>(null);
  const [open, setOpen] = useState<{ p: Archived; i: number } | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const langs = useMemo(() => {
    const count: Record<string, number> = {};
    archive.forEach((p) => p.stack.forEach((s) => (count[s] = (count[s] ?? 0) + 1)));
    return ["Todos", ...Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([k]) => k)];
  }, []);

  const rows = archive.filter((p) => filter === "Todos" || p.stack.includes(filter));

  const onMove = (e: MouseEvent) => {
    const el = preview.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`;
  };

  return (
    <section id="arquivo" ref={ref} className={`sec archive ${cls}`}>
      <StepHead id="arquivo" right={`${archive.length} projetos`} />

      <div className="archive__top">
        <h2 className="display display--m rv-cut">
          Tudo o que veio <em>antes.</em>
        </h2>
        <div className="filters" role="toolbar" aria-label="Filtrar por tecnologia">
          {langs.map((l) => (
            <button key={l} className={`filter ${filter === l ? "is-on" : ""}`} onClick={() => setFilter(l)} aria-pressed={filter === l}>
              {l !== "Todos" && <TechIcon name={l} size={13} title={false} />}
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="index" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <div className="index__head mono-label" aria-hidden>
          <span>Nº</span>
          <span>Projeto</span>
          <span>Tipo</span>
          <span>Stack</span>
          <span>Ano</span>
          <span />
        </div>
        {rows.map((p, i) => (
          <div
            key={p.id}
            className={`index__row rv-wipe ${p.images ? "has-img" : ""}`}
            style={{ ["--i" as string]: i }}
            onMouseEnter={() => setHover(p.images ? p : null)}
          >
            <span className="index__n mono">{String(archive.indexOf(p) + 1).padStart(2, "0")}</span>
            <span className="index__title">
              {p.images ? (
                <button onClick={() => setOpen({ p, i: 0 })}>{p.title}</button>
              ) : (
                <a href={p.repo} target="_blank" rel="noreferrer">{p.title}</a>
              )}
              <small>{p.summary}</small>
            </span>
            <span className="index__kind mono-label">{p.kind}</span>
            <span className="index__stack">
              {p.stack.map((s) => (
                <TechIcon key={s} name={s} size={16} />
              ))}
            </span>
            <span className="index__year mono">{p.year}</span>
            <span className="index__links">
              {p.images && (
                <button className="mono-label" onClick={() => setOpen({ p, i: 0 })}>
                  {p.images.length} imgs
                </button>
              )}
              {p.live && (
                <a className="mono-label" href={p.live} target="_blank" rel="noreferrer">site ↗</a>
              )}
              {p.repo && (
                <a className="mono-label" href={p.repo} target="_blank" rel="noreferrer" aria-label={`Repositório de ${p.title}`}>repo ↗</a>
              )}
            </span>
          </div>
        ))}
      </div>

      <div ref={preview} className={`float-preview ${hover ? "is-on" : ""}`} aria-hidden>
        {hover?.images && <img src={hover.images[0]} alt="" />}
        {hover && <span className="mono-label">{hover.title} · clique para abrir</span>}
      </div>

      {open && <Lightbox p={open.p} start={open.i} onClose={() => setOpen(null)} />}
    </section>
  );
}

export type Gallery = Pick<Archived, "title" | "kind" | "summary" | "images">;

export function Lightbox({ p, start, onClose }: { p: Gallery; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const imgs = p.images ?? [];
  const n = imgs.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + n) % n);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [n, onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={p.title} onClick={onClose}>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox__bar">
          <span className="mono-label">{p.title} · {p.kind}</span>
          <span className="mono-label">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <button className="mono-label" onClick={onClose} aria-label="Fechar">fechar ✕</button>
        </div>
        <div className="lightbox__stage">
          <img key={i} src={imgs[i]} alt={`${p.title}, captura ${i + 1}`} />
        </div>
        <div className="lightbox__foot">
          <p>{p.summary}</p>
          <div className="lightbox__nav">
            <button onClick={() => setI((x) => (x - 1 + n) % n)} aria-label="Anterior">←</button>
            {imgs.map((src, j) => (
              <button key={src} className={`lightbox__thumb ${j === i ? "is-on" : ""}`} onClick={() => setI(j)} aria-label={`Captura ${j + 1}`}>
                <img src={src} alt="" />
              </button>
            ))}
            <button onClick={() => setI((x) => (x + 1) % n)} aria-label="Próxima">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
