import { useState } from "react";
import { profile, links } from "@/data/profile";
import { copy, useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

export function Contact() {
  const { ref, cls } = useReveal<HTMLElement>(0.15);
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
      <div className="cta-card fade">
        <span className="cta-card__eyebrow">contato</span>
        <h2>Vamos conversar?</h2>
        <p>Estou aberto a trocar ideia sobre projetos, oportunidades ou só sobre tecnologia.</p>
        <div className="cta-card__actions">
          <a href={links.email} className="btn btn--white">
            enviar e-mail
          </a>
          <button className="btn btn--outline-white" onClick={onCopy}>
            {copied ? "copiado ✓" : profile.email}
          </button>
        </div>
        <ul className="cta-card__socials">
          {[
            { k: "LinkedIn", href: links.linkedin },
            { k: "GitHub", href: links.github },
            { k: "WhatsApp", href: links.whatsapp },
          ].map((s) => (
            <li key={s.k}>
              <a href={s.href} target="_blank" rel="noreferrer">
                <TechIcon name={s.k} size={16} title={false} />
                {s.k}
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
      <span>
        © {new Date().getFullYear()} {profile.fullName}
      </span>
      <span>feito com React + Vite</span>
    </footer>
  );
}
