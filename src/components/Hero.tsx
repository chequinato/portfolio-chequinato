import { useEffect, useState, type MouseEvent } from "react";
import { links, profile } from "@/data/profile";
import { featured } from "@/data/projects";
import { TechIcon } from "@/lib/icons";
import { useReveal, magnet, unmagnet } from "@/lib/hooks";
import { JobHead } from "./JobHead";
import { Badge } from "./Badge";

// Palavras que vão se revezando depois de "focado em".
const words = ["back-end", "cloud na AWS", "Terraform", "APIs em Python", "dados com SQL"];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="rotator" aria-live="off">
      <span key={i} className="rotator__word">
        {words[i]}
      </span>
    </span>
  );
}

// O projeto em construção agora — aparece como "shipping".
const shipping = featured.find((p) => p.wip);

export function Hero() {
  const { ref, cls } = useReveal<HTMLElement>(0.05);

  // Parallax: ao rolar, texto e crachá andam em velocidades diferentes.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        ref.current?.style.setProperty("--py", String(y));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref]);

  // A luz da grade de fundo segue o mouse.
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  const socials = [
    { k: "GitHub", href: links.github },
    { k: "LinkedIn", href: links.linkedin },
    { k: "WhatsApp", href: links.whatsapp },
  ];

  return (
    <section id="inicio" ref={ref} className={`hero ${cls}`} onMouseMove={onMove}>
      <span className="hero__grid" aria-hidden />

      <div className="hero__inner container">
        <div className="hero__text">
          <JobHead id="inicio" label="olá, eu sou" />
          <h1 className="hero__title">
            <span className="line">
              <span className="line__in">Miguel</span>
            </span>
            <span className="line">
              <span className="line__in" style={{ ["--d" as string]: 1 }}>
                Chequinato<span className="hero__caret" aria-hidden />
              </span>
            </span>
          </h1>
          <p className="hero__role fade" style={{ ["--d" as string]: 3 }}>
            Engenheiro de software focado em <RotatingWord />
          </p>

          {shipping && (
            <a href="#projetos" className="shipping fade" style={{ ["--d" as string]: 4 }}>
              <span className="shipping__dot" aria-hidden />
              <span className="shipping__k">shipping agora</span>
              <b>{shipping.title} API</b>
              <span className="shipping__stack">{shipping.stack.slice(0, 3).join(" · ")}</span>
              <span aria-hidden>→</span>
            </a>
          )}

          <div className="hero__cta fade" style={{ ["--d" as string]: 5 }}>
            <a href="#projetos" className="btn btn--primary" onMouseMove={magnet} onMouseLeave={unmagnet}>
              Ver projetos
            </a>
            <a href={profile.cv} download="Curriculo-Miguel-Chequinato.pdf" className="btn btn--ghost">
              Currículo
            </a>
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.k}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.k} title={s.k}>
                    <TechIcon name={s.k} size={17} title={false} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__visual">
          <Badge />
        </div>
      </div>

      <a href="#sobre" className="scroll-hint" aria-label="Rolar para baixo">
        <span />
      </a>
    </section>
  );
}
