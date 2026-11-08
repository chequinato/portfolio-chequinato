import { useEffect, useRef, useState, type MouseEvent } from "react";
import photo from "@/assets/profile-photo.png";
import { profile, links } from "@/data/profile";
import { TechIcon } from "@/lib/icons";
import { useReveal, magnet, unmagnet } from "@/lib/hooks";
import { JobHead } from "./JobHead";

// Ícones que orbitam a foto — a stack aparece sem precisar de texto.
const orbit = ["AWS", "Python", "Terraform", "PostgreSQL", "Docker", "TypeScript"];

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

export function Hero() {
  const { ref, cls } = useReveal<HTMLElement>(0.05);
  const visual = useRef<HTMLDivElement>(null);

  // Parallax: ao rolar, foto, texto e manchas andam em velocidades diferentes.
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

  // A luz de fundo segue o mouse e a foto inclina levemente na direção dele.
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", `${e.clientX - r.left}px`);
    el.style.setProperty("--hy", `${e.clientY - r.top}px`);
    const v = visual.current;
    if (!v) return;
    const vr = v.getBoundingClientRect();
    const dx = (e.clientX - (vr.left + vr.width / 2)) / vr.width;
    const dy = (e.clientY - (vr.top + vr.height / 2)) / vr.height;
    v.style.setProperty("--ry", `${Math.max(-1, Math.min(1, dx)) * 10}deg`);
    v.style.setProperty("--rx", `${Math.max(-1, Math.min(1, dy)) * -10}deg`);
  };
  const onLeave = () => {
    visual.current?.style.setProperty("--rx", "0deg");
    visual.current?.style.setProperty("--ry", "0deg");
  };

  const socials = [
    { k: "GitHub", href: links.github },
    { k: "LinkedIn", href: links.linkedin },
    { k: "WhatsApp", href: links.whatsapp },
  ];

  return (
    <section id="inicio" ref={ref} className={`hero ${cls}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className="hero__glow" aria-hidden />
      <span className="blob blob--a" aria-hidden />
      <span className="blob blob--b" aria-hidden />

      <div className="hero__inner container">
        <div className="hero__text">
          <JobHead id="inicio" label="olá, eu sou" />
          <h1 className="hero__title">
            <span className="line">
              <span className="line__in">Miguel</span>
            </span>
            <span className="line">
              <span className="line__in accent" style={{ ["--d" as string]: 1 }}>
                Chequinato
              </span>
            </span>
          </h1>
          <p className="hero__role fade" style={{ ["--d" as string]: 3 }}>
            Engenheiro de software focado em <RotatingWord />
          </p>

          <div className="hero__cta fade" style={{ ["--d" as string]: 4 }}>
            <a href="#projetos" className="btn btn--primary" onMouseMove={magnet} onMouseLeave={unmagnet}>
              Ver projetos
            </a>
            <a href={profile.cv} download="Curriculo-Miguel-Chequinato.pdf" className="btn btn--ghost">
              Currículo
            </a>
          </div>

          <ul className="socials fade" style={{ ["--d" as string]: 5 }}>
            {socials.map((s) => (
              <li key={s.k}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.k} title={s.k}>
                  <TechIcon name={s.k} size={17} title={false} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual pop" style={{ ["--d" as string]: 2 }}>
          <div className="tilt" ref={visual}>
            <div className="ring-orbit" aria-hidden>
              {orbit.map((t, i) => (
                <span key={t} className="orbit-item" style={{ ["--a" as string]: `${(360 / orbit.length) * i}deg` }}>
                  <span className="orbit-item__bubble">
                    <TechIcon name={t} size={20} title={false} />
                  </span>
                </span>
              ))}
            </div>
            <div className="hero__ring">
              <img src={photo} alt={`Foto de ${profile.name}`} className="hero__photo" />
            </div>
          </div>
        </div>
      </div>

      <a href="#sobre" className="scroll-hint" aria-label="Rolar para baixo">
        <span />
      </a>
    </section>
  );
}
