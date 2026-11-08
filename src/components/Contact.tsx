import { useState } from "react";
import { Link } from "react-router-dom";
import { profile, links } from "@/data/profile";
import { copy, useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

const socials = [
  { k: "LinkedIn", href: links.linkedin },
  { k: "GitHub", href: links.github },
  { k: "WhatsApp", href: links.whatsapp },
];

export function Contact() {
  const { ref, cls } = useReveal<HTMLElement>(0.2);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (await copy(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } else {
      window.location.href = links.email;
    }
  };

  return (
    <section id="contato" ref={ref} className={`section container ${cls}`}>
      <div className="cta-card pop">
        <span className="cta-card__ring cta-card__ring--a" aria-hidden />
        <span className="cta-card__ring cta-card__ring--b" aria-hidden />
        <h2>Vamos conversar?</h2>
        <div className="cta-card__actions">
          <a href={links.email} className="btn btn--white">
            Enviar e-mail
          </a>
          <button className="btn btn--outline-white" onClick={onCopy}>
            {copied ? "Copiado ✓" : "Copiar e-mail"}
          </button>
        </div>
        <ul className="cta-card__socials">
          {socials.map((s) => (
            <li key={s.k}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.k} title={s.k}>
                <TechIcon name={s.k} size={18} title={false} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer container">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <nav>
        <Link to="/notas">Notas</Link>
        <a href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Voltar ao topo ↑
        </a>
      </nav>
    </footer>
  );
}
