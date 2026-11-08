import photo from "@/assets/profile-photo.png";
import { profile, links } from "@/data/profile";
import { TechIcon } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";

// Abertura: quem eu sou em uma frase, dois botões e a foto no círculo.
export function Hero() {
  const { ref, cls } = useReveal<HTMLElement>(0.05);

  const socials = [
    { k: "GitHub", href: links.github },
    { k: "LinkedIn", href: links.linkedin },
    { k: "WhatsApp", href: links.whatsapp },
  ];

  return (
    <section id="inicio" ref={ref} className={`hero container ${cls}`}>
      <div className="hero__text">
        <span className="hero__line fade" aria-hidden />
        <p className="hero__hello fade" style={{ ["--d" as string]: 1 }}>
          olá, eu sou
        </p>
        <h1 className="hero__title fade" style={{ ["--d" as string]: 2 }}>
          {profile.name}
          <br />
          <span className="accent">engenheiro de software</span>
        </h1>
        <p className="hero__lede fade" style={{ ["--d" as string]: 3 }}>
          Tenho {profile.age} anos e construo back-ends e infraestrutura na nuvem com AWS, Terraform, Python e SQL.
        </p>

        <div className="hero__cta fade" style={{ ["--d" as string]: 4 }}>
          <a href="#projetos" className="btn btn--primary">
            ver projetos
          </a>
          <a href={profile.cv} download="Curriculo-Miguel-Chequinato.pdf" className="btn btn--ghost">
            baixar currículo
          </a>
        </div>

        <ul className="socials fade" style={{ ["--d" as string]: 5 }}>
          {socials.map((s) => (
            <li key={s.k}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.k} title={s.k}>
                <TechIcon name={s.k} size={18} title={false} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__visual fade" style={{ ["--d" as string]: 2 }}>
        <div className="orbit orbit--outer" aria-hidden />
        <div className="orbit orbit--inner" aria-hidden />
        <div className="hero__ring">
          <img src={photo} alt={`Foto de ${profile.name}`} className="hero__photo" />
        </div>
        <span className="float-pill float-pill--status">
          <span className="dot" /> aberto a oportunidades
        </span>
        <span className="float-pill float-pill--place">
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
              fill="currentColor"
            />
          </svg>
          {profile.city}
        </span>
      </div>
    </section>
  );
}
