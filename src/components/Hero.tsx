import photo from "@/assets/profile-photo.png";
import { profile, links } from "@/data/profile";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";

// Ícones que orbitam a foto — a stack aparece sem precisar de texto.
const orbit = ["AWS", "Python", "Terraform", "PostgreSQL", "Docker", "TypeScript"];

export function Hero() {
  const { ref, cls } = useReveal<HTMLElement>(0.05);

  const socials = [
    { k: "GitHub", href: links.github },
    { k: "LinkedIn", href: links.linkedin },
    { k: "WhatsApp", href: links.whatsapp },
  ];

  return (
    <section id="inicio" ref={ref} className={`hero ${cls}`}>
      <span className="blob blob--a" aria-hidden />
      <span className="blob blob--b" aria-hidden />

      <div className="hero__inner container">
        <div className="hero__text">
          <span className="eyebrow fade">olá, eu sou</span>
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
            Engenheiro de software · back-end &amp; cloud
          </p>

          <div className="hero__cta fade" style={{ ["--d" as string]: 4 }}>
            <a href="#projetos" className="btn btn--primary">
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

      <a href="#sobre" className="scroll-hint" aria-label="Rolar para baixo">
        <span />
      </a>
    </section>
  );
}
