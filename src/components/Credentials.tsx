import { useMemo, useState } from "react";
import { badges } from "@/data/career";
import { links } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { StepHead } from "./StepHead";

// Os certificados como os "artifacts" de uma execução: a lista que o
// GitHub mostra no fim da run, com nome, origem e data — e aqui a imagem
// do próprio certificado, clicável para a verificação oficial.

const issuers = ["Todos", "Itaú Unibanco", "Amazon Web Services", "Anthropic", "Udemy", "Microsoft", "Google", "Cisco"];

export function Credentials() {
  const { ref, cls } = useReveal<HTMLElement>(0.06);
  const [who, setWho] = useState("Todos");
  const list = useMemo(() => badges.filter((b) => who === "Todos" || b.issuer === who), [who]);

  return (
    <section id="credenciais" ref={ref} className={`sec creds ${cls}`}>
      <StepHead id="credenciais" right={`${badges.length} artifacts`} />

      <div className="creds__top">
        <h2 className="display display--m rv-cut">
          Artifacts <em>desta run.</em>
        </h2>
        <p className="serif-note rv" style={{ ["--i" as string]: 1 }}>
          Certificados e trilhas concluídos em 2026 — do Itaú, da AWS, da Anthropic, da Microsoft. Cada um abre a
          verificação oficial ou a publicação de quando saiu.
        </p>
      </div>

      <div className="filters creds__filters" role="toolbar" aria-label="Filtrar por emissor">
        {issuers
          .filter((i) => i === "Todos" || badges.some((b) => b.issuer === i))
          .map((i) => (
            <button key={i} className={`filter ${who === i ? "is-on" : ""}`} onClick={() => setWho(i)} aria-pressed={who === i}>
              {i}
              <span className="filter__n mono">{i === "Todos" ? badges.length : badges.filter((b) => b.issuer === i).length}</span>
            </button>
          ))}
      </div>

      <div className="artifacts">
        <div className="artifacts__head mono-label" aria-hidden>
          <span>artifact</span>
          <span>emissor</span>
          <span>data</span>
        </div>
        <ul className="artifacts__grid">
          {list.map((b, i) => (
            <li key={b.title} className={`artifact artifact--${b.shape} rv-cut`} style={{ ["--i" as string]: i % 6 }}>
              <a href={b.url} target="_blank" rel="noreferrer">
                <div className="artifact__img">
                  <img src={b.image} alt={`Certificado ${b.title}`} loading="lazy" />
                </div>
                <div className="artifact__meta">
                  <span className="artifact__file mono">
                    {b.title.toLowerCase().replace(/[^a-z0-9à-ú]+/gi, "-").replace(/(^-|-$)/g, "").slice(0, 34)}.cert
                  </span>
                  <h3>{b.title}</h3>
                  <div className="artifact__row mono-label">
                    <span>{b.issuer}</span>
                    <span>{b.date.split("-").reverse().join("/")}</span>
                  </div>
                  <span className="artifact__skills">{b.skills.join(" · ")}</span>
                  <span className="mono-label artifact__verify">verificar ↗</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a className="link-arrow creds__more" href={`${links.linkedin}details/certifications/`} target="_blank" rel="noreferrer">
        Lista completa no LinkedIn <span aria-hidden>↗</span>
      </a>
    </section>
  );
}
