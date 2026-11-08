import { profile } from "@/data/profile";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";

const stack = ["AWS", "Terraform", "Python", "SQL", "FastAPI", "PostgreSQL", "Docker", "TypeScript", "React", "Git"];

// Pouco texto: duas frases, onde trabalho hoje e as ferramentas em ícones.
export function About() {
  const { ref, cls } = useReveal<HTMLElement>(0.15);

  return (
    <section id="sobre" ref={ref} className={`section container ${cls}`}>
      <div className="about">
        <div className="about__text">
          <span className="eyebrow fade">sobre mim</span>
          <h2 className="sec-title fade" style={{ ["--d" as string]: 1 }}>
            Do código <span className="accent">à nuvem.</span>
          </h2>
          <p className="about__p fade" style={{ ["--d" as string]: 2 }}>
            Tenho {profile.age} anos, programo desde {profile.since} e curso {profile.course}. Gosto de construir
            back-ends e a infraestrutura que roda eles.
          </p>

          <div className="work-card fade" style={{ ["--d" as string]: 3 }}>
            <img src="/itau.svg" alt="Itaú Unibanco" className="work-card__logo" />
            <div>
              <span className="work-card__role">{profile.role}</span>
              <span className="work-card__meta">{profile.company}</span>
            </div>
          </div>
        </div>

        <ul className="stack">
          {stack.map((t, i) => (
            <li key={t} className="pop" style={{ ["--d" as string]: i * 0.6 + 2 }}>
              <span className="stack__item">
                <span className="stack__icon">
                  <TechIcon name={t} size={26} title={false} />
                </span>
                <span className="stack__name">{t}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
