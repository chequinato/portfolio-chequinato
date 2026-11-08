import { useState } from "react";
import { badges } from "@/data/career";
import { links } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { SectionHead } from "./SectionHead";

const fmt = (ym: string) => {
  const [y, m] = ym.split("-");
  const mes = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"][Number(m) - 1];
  return `${mes}. ${y}`;
};

export function Certificates() {
  const { ref, cls } = useReveal<HTMLElement>(0.08);
  const [all, setAll] = useState(false);
  const list = all ? badges : badges.slice(0, 8);

  return (
    <section id="certificados" ref={ref} className={`section container ${cls}`}>
      <SectionHead
        center
        eyebrow="certificados"
        title={
          <>
            Estudando <span className="accent">sempre</span>
          </>
        }
        intro="Cada card abre a verificação oficial ou a publicação de quando saiu."
      />

      <ul className="certs">
        {list.map((b) => (
          <li key={b.title}>
            <a className="card cert" href={b.url} target="_blank" rel="noreferrer">
              <span className={`cert__img cert__img--${b.shape}`}>
                <img src={b.image} alt="" loading="lazy" />
              </span>
              <span className="cert__title">{b.title}</span>
              <span className="cert__meta">
                {b.issuer} · {fmt(b.date)}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="center-row">
        {badges.length > 8 && (
          <button className="btn btn--ghost" onClick={() => setAll((a) => !a)}>
            {all ? "mostrar menos" : `ver todos (${badges.length})`}
          </button>
        )}
        <a className="link" href={links.credly} target="_blank" rel="noreferrer">
          selos no Credly <span aria-hidden>↗</span>
        </a>
      </div>
    </section>
  );
}
