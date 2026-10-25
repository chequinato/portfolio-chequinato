import { useState } from "react";
import photo from "@/assets/profile-photo.png";
import { StepHead } from "./StepHead";
import { Halftone } from "./Halftone";
import { Counter } from "./Counter";
import { RunSummary } from "./RunSummary";
import { profile, links } from "@/data/profile";
import { featured, archive } from "@/data/projects";
import { badges } from "@/data/career";
import { useReveal, copy } from "@/lib/hooks";
import snapshot from "@/data/github-snapshot.json";

// Abertura em cartaz: "Miguel" em itálico serifado, o sobrenome gigante
// ocupando a largura, e embaixo foto, a frase de apresentação e os números.
export function Hero() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.05);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (await copy(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } else {
      window.location.href = links.email;
    }
  };

  const nums = [
    { v: profile.age, l: "anos" },
    { v: featured.length + archive.length, l: "projetos públicos" },
    { v: snapshot.total, l: "contribuições no último ano" },
    { v: badges.length, l: "certificados" },
  ];

  return (
    <section id="inicio" ref={ref} className={`sec hero ${cls}`}>
      <StepHead id="inicio" right={`${profile.city} · 23°11′S 46°53′W`} />

      <h1 className="hero__name" aria-label={profile.name}>
        <span className="hero__first rv" style={{ ["--i" as string]: 0 }}>
          Miguel
        </span>
        <span className="hero__last rv-cut" style={{ ["--i" as string]: 1 }}>
          Chequinato<span className="hero__dot">.</span>
        </span>
      </h1>

      <div className="hero__grid">
        <div className="hero__fig rv-cut" style={{ ["--i" as string]: 2 }}>
          <Halftone src={photo} focusX={0.56} focusY={0.38} />
        </div>

        <div className="hero__body">
          <p className="hero__lede rv" style={{ ["--i" as string]: 3 }}>
            Engenheiro de software, {profile.age} anos. Coloco sistemas <em>na nuvem</em> no{" "}
            <span className="hero__itau">Itaú</span> — com AWS, Terraform, Python e SQL.
          </p>
          <div className="hero__cta rv" style={{ ["--i" as string]: 4 }}>
            <a href="#projetos" className="btn btn--solid">
              Ver projetos <span aria-hidden>↓</span>
            </a>
            <a href={profile.cv} download="Curriculo-Miguel-Chequinato.pdf" className="btn">
              Currículo
            </a>
            <button className={`btn btn--ghost ${copied ? "is-done" : ""}`} onClick={onCopy} title="Copiar e-mail">
              <span className="mono">{copied ? "copiado ✓" : profile.email}</span>
            </button>
          </div>
          <p className="hero__status mono rv" style={{ ["--i" as string]: 5 }}>
            <span className="led" /> aberto a conversar · {profile.school}, {profile.semester}
          </p>
        </div>

        <ul className="hero__nums">
          {nums.map((n, i) => (
            <li key={n.l} className="rv" style={{ ["--i" as string]: 4 + i }}>
              <Counter value={n.v} run={inView} className="num hero__num" delay={300 + i * 120} />
              <span className="hero__numl">{n.l}</span>
            </li>
          ))}
        </ul>
      </div>

      <RunSummary />
    </section>
  );
}
