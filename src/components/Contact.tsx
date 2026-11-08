import { useState } from "react";
import { Link } from "react-router-dom";
import { profile, links } from "@/data/profile";
import { copy, useReveal, magnet, unmagnet } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";
import { usePipeline } from "@/lib/pipeline";
import { JobHead } from "./JobHead";
import { StatusIcon } from "./StatusIcon";
import { Confetti } from "./Confetti";
import { CiStatus } from "./CiStatus";

const socials = [
  { k: "LinkedIn", href: links.linkedin },
  { k: "GitHub", href: links.github },
  { k: "WhatsApp", href: links.whatsapp },
];

// O último job da run é o deploy — e ele espera a aprovação de quem está
// lendo, como um environment protegido no GitHub Actions.
export function Contact() {
  const { ref, cls } = useReveal<HTMLElement>(0.2);
  const [copied, setCopied] = useState(false);
  const run = usePipeline();
  const approved = run.done;

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
      <JobHead id="contato" label="contato" />
      <div className={`cta-card pop ${approved ? "is-approved" : ""}`}>
        <span className="cta-card__ring cta-card__ring--a" aria-hidden />
        <span className="cta-card__ring cta-card__ring--b" aria-hidden />
        {approved && <Confetti />}

        <div className="env">
          <StatusIcon s={approved ? "success" : "running"} size={15} />
          <span>
            environment <b>production</b>
          </span>
          <span className="env__state">{approved ? "aprovado" : "aguardando revisão"}</span>
        </div>

        <h2>Vamos conversar?</h2>
        <p className="cta-card__sub">{approved ? "Deploy aprovado — te respondo rapidinho!" : "Esse deploy precisa da sua aprovação."}</p>

        <div className="cta-card__actions">
          <a
            href={links.email}
            className="btn btn--white"
            onClick={run.approve}
            onMouseMove={magnet}
            onMouseLeave={unmagnet}
          >
            {approved ? "✓ Aprovado" : "Aprovar e enviar e-mail"}
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
  const run = usePipeline();
  return (
    <footer className="footer container">
      <span className="footer__run">
        <StatusIcon s={run.done ? "success" : "running"} size={14} />
        <code>portfolio.yml</code>
        {run.done
          ? `· todos os jobs passaram em ${run.total}`
          : run.waiting
            ? "· deploy aguardando sua aprovação"
            : "· rodando…"}
      </span>
      <CiStatus />
      <nav>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <Link to="/notas">Notas</Link>
        <a href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Topo ↑
        </a>
      </nav>
    </footer>
  );
}
