import { StepHead } from "./StepHead";
import photo from "@/assets/profile-photo.png";
import { Halftone } from "./Halftone";
import { Counter } from "./Counter";
import { profile, links } from "@/data/profile";
import { featured, archive } from "@/data/projects";
import { useReveal, copy } from "@/lib/hooks";
import { useState, type ReactNode } from "react";
import snapshot from "@/data/github-snapshot.json";
import { RunSummary } from "./RunSummary";

export function Hero() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.05);
  const [copied, setCopied] = useState(false);
  const years = new Date().getFullYear() - profile.since;

  const onCopy = async () => {
    if (await copy(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } else {
      window.location.href = links.email;
    }
  };

  const spec: [string, ReactNode][] = [
    ["Cargo", profile.role],
    [
      "Empresa",
      <span className="spec__itau">
        <img src="/itau.svg" alt="" width={18} height={18} />
        {profile.company}
      </span>,
    ],
    ["Formação", `${profile.course} · ${profile.school} · ${profile.semester}`],
    ["Foco", "AWS · Terraform · Python · SQL · eventos"],
    ["Base", profile.city],
    [
      "Status",
      <span className="spec__status">
        <span className="led" />
        Aberto a conversar
      </span>,
    ],
  ];

  return (
    <section id="inicio" ref={ref} className={`sec hero ${cls}`}>
      <StepHead id="inicio" right={profile.city} />
      <RunSummary />

      <h1 className="hero__name" aria-label={profile.name}>
        <span className="hero__line rv-cut" style={{ ["--i" as string]: 0 }}>
          Miguel
        </span>
        <span className="hero__line hero__line--2 rv-cut" style={{ ["--i" as string]: 1 }}>
          Chequinato<span className="hero__dot">.</span>
        </span>
      </h1>

      <div className="hero__grid">
        <div className="hero__fig rv-cut" style={{ ["--i" as string]: 2 }}>
          <Halftone src={photo} focusX={0.56} focusY={0.38} />
        </div>

        <div className="hero__body">
          <p className="hero__lede rv" style={{ ["--i" as string]: 3 }}>
            Engenheiro de software em formação, {profile.age} anos. Hoje no <strong>Itaú Unibanco</strong>, colocando
            sistemas na nuvem com <strong>AWS</strong> e <strong>Terraform</strong>, escrevendo <strong>Python</strong>{" "}
            e conversando com bancos <strong>SQL</strong>.
          </p>

          <dl className="spec">
            {spec.map(([k, v], i) => (
              <div className="spec__row rv-wipe" style={{ ["--i" as string]: 4 + i }} key={k}>
                <dt className="mono-label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="hero__cta rv" style={{ ["--i" as string]: 10 }}>
            <a href="#projetos" className="btn btn--solid">
              Ver projetos <span aria-hidden>↓</span>
            </a>
            <a href={profile.cv} download="Curriculo-Miguel-Chequinato.pdf" className="btn">
              Currículo <span className="mono" aria-hidden>PDF</span>
            </a>
            <button className={`btn btn--ghost ${copied ? "is-done" : ""}`} onClick={onCopy} title="Copiar e-mail">
              <span className="mono">{copied ? "copiado ✓" : profile.email}</span>
            </button>
          </div>
        </div>

        <ul className="hero__nums">
          {[
            { v: profile.age, l: "anos" },
            { v: years, l: `anos estudando · desde ${profile.since}` },
            { v: featured.length + archive.length, l: "projetos públicos" },
            { v: snapshot.total, l: `contribuições em ${snapshot.year}` },
          ].map((n, i) => (
            <li key={n.l} className="rv" style={{ ["--i" as string]: 5 + i }}>
              <Counter value={n.v} run={inView} className="num hero__num" delay={300 + i * 120} />
              <span className="mono-label">{n.l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
