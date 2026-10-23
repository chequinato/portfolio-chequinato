import { useEffect, useRef, useState } from "react";
import { posts, postImage, postUrl, linkedinStats, totalImpressions } from "@/data/linkedin";
import { links } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { StepHead } from "./StepHead";
import { Counter } from "./Counter";

// O "diário público": as publicações do LinkedIn numa esteira horizontal.
// No desktop a seção prende na tela e a rolagem vertical empurra a esteira
// para o lado; no celular (ou com menos movimento) vira rolagem nativa.

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

export function Publications() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.05);
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [x, setX] = useState(0);
  const [h, setH] = useState<number | undefined>(undefined);
  const xRef = useRef(0);
  const top = Math.max(...posts.map((p) => p.impressions));

  useEffect(() => {
    // Quanto a esteira precisa andar: largura total + onde ela começa (depois
    // do trilho lateral) − a tela, para o último card parar inteiro à vista.
    const distance = () => {
      const t = track.current;
      if (!t) return 0;
      const start = t.getBoundingClientRect().left - xRef.current;
      return Math.max(0, start + t.scrollWidth - window.innerWidth + 24);
    };
    const mq = matchMedia("(min-width: 861px) and (max-height: 1400px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      const on = mq.matches;
      setPinned(on);
      if (!on || !track.current) {
        setH(undefined);
        setX(0);
        return;
      }
      setH(window.innerHeight + distance());
    };
    const onScroll = () => {
      if (!mq.matches || !outer.current || !track.current) return;
      const r = outer.current.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      xRef.current = -prog * distance();
      setX(xRef.current);
    };
    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section id="publicacoes" ref={ref} className={`pubs ${cls}`}>
      <div className="sec pubs__head">
        <StepHead id="publicacoes" right={`${posts.length} publicações`} />
        <div className="pubs__top">
          <h2 className="display display--m rv-cut">
            Aprendo <em>em público.</em>
          </h2>
          <dl className="pubs__stats">
            <div>
              <dt><Counter value={linkedinStats.followers} run={inView} className="num" /></dt>
              <dd className="mono-label">seguidores no LinkedIn</dd>
            </div>
            <div>
              <dt><Counter value={totalImpressions} run={inView} className="num" delay={150} /></dt>
              <dd className="mono-label">impressões nas publicações</dd>
            </div>
            <div>
              <dt><Counter value={top} run={inView} className="num" delay={300} /></dt>
              <dd className="mono-label">no post mais visto</dd>
            </div>
          </dl>
        </div>
      </div>

      <div ref={outer} className={`pubs__outer ${pinned ? "is-pinned" : ""}`} style={{ height: h }}>
        <div className="pubs__sticky">
          <div className="pubs__lane mono-label" aria-hidden>
            <span>linkedin.com/in/miguel-chequinato</span>
            <span className="pubs__lane-rule" />
            <span>role ↓ para avançar a esteira →</span>
          </div>
          <div ref={track} className="pubs__track" style={{ transform: `translate3d(${x}px,0,0)` }}>
            {posts.map((p, i) => (
              <article key={p.id} className={`post ${p.impressions === top ? "is-top" : ""}`}>
                <a href={postUrl(p.id)} target="_blank" rel="noreferrer" className="post__link">
                  <div className={`post__media ${p.images ? "" : p.video ? "is-video" : "is-text"}`}>
                    {p.images > 0 ? (
                      <img src={postImage(p.id)} alt="" loading="lazy" />
                    ) : p.video ? (
                      <span className="post__play">
                        <span>▶</span> vídeo no LinkedIn
                      </span>
                    ) : (
                      <span className="post__quote">{p.title}</span>
                    )}
                    {p.images > 1 && <span className="post__count mono">+{p.images - 1}</span>}
                    {p.impressions === top && <span className="post__flag mono">mais visto</span>}
                  </div>
                  <div className="post__body">
                    <div className="post__meta mono">
                      <span>#{String(posts.length - i).padStart(2, "0")}</span>
                      <span>{fmt(p.date)}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <div className="post__foot mono">
                      <span>{p.impressions.toLocaleString("pt-BR")} impressões</span>
                      <span>{p.reactions} reações{p.comments ? ` · ${p.comments} coment.` : ""}</span>
                    </div>
                    <div className="post__tags">
                      {p.tags.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </article>
            ))}
            <a className="post post--more" href={`${links.linkedin}recent-activity/all/`} target="_blank" rel="noreferrer">
              <span className="mono-label">continua no LinkedIn</span>
              <span className="post__more">Ver tudo ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
