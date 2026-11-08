import { nowStack, profile } from "@/data/profile";
import { featured, archive } from "@/data/projects";
import { badges } from "@/data/career";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";
import { SectionHead } from "./SectionHead";

// Quem eu sou hoje: um parágrafo, onde trabalho (discreto) e a stack do dia a dia.
export function About() {
  const { ref, cls } = useReveal<HTMLElement>(0.1);

  const stats = [
    { v: featured.length + archive.length, l: "projetos públicos" },
    { v: badges.length, l: "certificados" },
    { v: new Date().getFullYear() - profile.since, l: "anos programando" },
  ];

  return (
    <section id="sobre" ref={ref} className={`section container ${cls}`}>
      <div className="about">
        <div className="about__text fade">
          <SectionHead
            eyebrow="sobre mim"
            title={
              <>
                Back-end e cloud, <span className="accent">do código à infra</span>
              </>
            }
          />
          <p className="about__p">
            Comecei sozinho em {profile.since} e desde então transformo o que aprendo em projetos públicos. Curso{" "}
            {profile.course} na {profile.school} e gosto de sistemas orientados a eventos, Clean Architecture e
            infraestrutura versionada.
          </p>

          <div className="work-card">
            <img src="/itau.svg" alt="Itaú Unibanco" className="work-card__logo" />
            <div>
              <span className="work-card__role">{profile.role}</span>
              <span className="work-card__meta">
                {profile.company} · desde mai. 2026
              </span>
            </div>
            <span className="pill pill--soft">atual</span>
          </div>

          <ul className="stats">
            {stats.map((s) => (
              <li key={s.l}>
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="stack-grid">
          {nowStack.map((s, i) => (
            <li key={s.title} className="card stack-card fade" style={{ ["--d" as string]: i + 1 }}>
              <span className="icon-tile">
                <TechIcon name={s.title} size={22} />
              </span>
              <span className="stack-card__area">{s.area}</span>
              <h3>{s.title}</h3>
              <p>{s.items.slice(0, 5).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
