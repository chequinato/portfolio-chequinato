import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import photo from "@/assets/profile-badge.jpg";
import { posts, postUrl, linkedinStats, type Post } from "@/data/linkedin";
import { profile, links } from "@/data/profile";
import type { Instrument } from "@/data/projects";
import { TechIcon } from "@/lib/icons";
import { useReveal, useCountUp, magnet, unmagnet } from "@/lib/hooks";
import { RevealTitle } from "./RevealTitle";
import { JobHead } from "./JobHead";
import { ProjectMock } from "./ProjectMock";

// Os posts mais recentes do LinkedIn num baralho: o card de cima pode ser
// arrastado (ou trocado pelas setas) e é arremessado para o fundo do monte.
// Passa sozinho enquanto ninguém mexe.

const latest = posts.slice(0, 6);
const fmt = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });

function PostCard({ p }: { p: Post }) {
  return (
    <article className="post">
      <header className="post__head">
        <img src={photo} alt="" className="post__avatar" />
        <div>
          <strong>{profile.name}</strong>
          <span>
            {profile.role} · {fmt(p.date)}
          </span>
        </div>
        <span className="post__brand">
          <TechIcon name="LinkedIn" size={20} title={false} />
        </span>
      </header>

      <h3 className="post__title">{p.title}</h3>
      <p className="post__text">{p.excerpt}</p>

      {p.images > 0 ? (
        <div className="post__media">
          <img src={`/linkedin/${p.id}_0.jpg`} alt="" loading="lazy" draggable={false} />
          {p.images > 1 && <span className="post__more">+{p.images - 1}</span>}
        </div>
      ) : p.video && p.project ? (
        <div className="post__media post__media--video">
          <ProjectMock kind={p.project as Instrument} />
          <span className="post__play" aria-hidden>
            ▶
          </span>
        </div>
      ) : (
        <ul className="post__tags">
          {p.tags.map((t) => (
            <li key={t}>#{t.toLowerCase().replace(/\s+/g, "")}</li>
          ))}
        </ul>
      )}

      <footer className="post__foot">
        <span className="post__reacts">
          <i className="r r--like">👍</i>
          <i className="r r--love">❤</i>
          <i className="r r--idea">💡</i>
          {p.reactions}
        </span>
        <span>{p.comments ? `${p.comments} comentários · ` : ""}{p.impressions.toLocaleString("pt-BR")} impressões</span>
      </footer>
    </article>
  );
}

export function LinkedIn() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.2);
  const [top, setTop] = useState(0);
  const [thrown, setThrown] = useState<{ i: number; dir: 1 | -1 } | null>(null);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; dx: number; el: HTMLElement } | null>(null);
  const n = latest.length;

  const followers = useCountUp(linkedinStats.followers, inView);
  const impressions = useCountUp(
    posts.reduce((a, p) => a + p.impressions, 0),
    inView,
    1800,
  );

  const next = useCallback(
    (dir: 1 | -1 = 1) => {
      setThrown({ i: dir === 1 ? top : (top - 1 + n) % n, dir });
      setTop((t) => (t + (dir === 1 ? 1 : -1) + n) % n);
    },
    [top, n],
  );

  useEffect(() => {
    if (!inView || paused) return;
    const t = setTimeout(() => next(1), 5000);
    return () => clearTimeout(t);
  }, [inView, paused, top, next]);

  // Arrastar o card de cima.
  const onDown = (e: PointerEvent<HTMLLIElement>) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, dx: 0, el };
    el.classList.add("is-dragging");
  };
  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const d = drag.current;
    if (!d) return;
    d.dx = e.clientX - d.x;
    d.el.style.transform = `translateX(${d.dx}px) rotate(${d.dx / 18}deg)`;
  };
  const onUp = () => {
    const d = drag.current;
    if (!d) return;
    d.el.classList.remove("is-dragging");
    d.el.style.transform = "";
    drag.current = null;
    if (Math.abs(d.dx) > 90) next(d.dx > 0 ? 1 : -1);
  };

  return (
    <section id="linkedin" ref={ref} className={`section container ${cls}`}>
      <div className="li">
        <div className="li__text">
          <JobHead id="linkedin" label="linkedin" />
          <RevealTitle text="O que eu" accent="publico." />
          <p className="sec-sub fade" style={{ ["--d" as string]: 3 }}>
            Bastidores dos projetos, estudos e o que aprendo no caminho.
          </p>

          <ul className="li__stats fade" style={{ ["--d" as string]: 4 }}>
            <li>
              <strong>{followers.toLocaleString("pt-BR")}+</strong>
              <span>seguidores</span>
            </li>
            <li>
              <strong>{impressions.toLocaleString("pt-BR")}</strong>
              <span>impressões nos posts</span>
            </li>
          </ul>

          <div className="li__cta fade" style={{ ["--d" as string]: 5 }}>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn--primary" onMouseMove={magnet} onMouseLeave={unmagnet}>
              <TechIcon name="LinkedIn" size={16} title={false} /> Seguir no LinkedIn
            </a>
            <a href={postUrl(latest[top].id)} target="_blank" rel="noreferrer" className="link">
              abrir este post <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div
          className="deck pop"
          style={{ ["--d" as string]: 3 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul className="deck__stack">
            {latest.map((p, i) => {
              const pos = (i - top + n) % n;
              const isThrown = thrown?.i === i;
              return (
                <li
                  key={p.id}
                  className={`deck__card ${pos === 0 ? "is-top" : ""} ${isThrown ? (thrown!.dir === 1 ? "is-thrown" : "is-back") : ""}`}
                  style={{ ["--pos" as string]: pos, zIndex: n - pos }}
                  aria-hidden={pos !== 0}
                  onPointerDown={pos === 0 ? onDown : undefined}
                  onPointerMove={pos === 0 ? onMove : undefined}
                  onPointerUp={pos === 0 ? onUp : undefined}
                  onPointerCancel={pos === 0 ? onUp : undefined}
                  onAnimationEnd={() => setThrown(null)}
                >
                  <PostCard p={p} />
                </li>
              );
            })}
          </ul>

          <div className="deck__nav">
            <button onClick={() => next(-1)} aria-label="Post anterior">
              ←
            </button>
            <span className="deck__dots" aria-hidden>
              {latest.map((p, i) => (
                <i key={p.id} className={i === top ? "is-on" : ""} />
              ))}
            </span>
            <button onClick={() => next(1)} aria-label="Próximo post">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
