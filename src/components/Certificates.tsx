import { badges } from "@/data/career";
import { useReveal } from "@/lib/hooks";
import { JobHead } from "./JobHead";

// Os certificados são os "artifacts" da run: uma faixa infinita só com as
// imagens. Passar o mouse pausa; clicar abre a verificação.
export function Certificates() {
  const { ref, cls } = useReveal<HTMLElement>(0.2);
  const row = [...badges, ...badges];
  return (
    <section id="certificados" ref={ref} className={`certs ${cls}`} aria-label="Certificados">
      <div className="container certs__head">
        <JobHead id="certificados" label="certificações" />
        <p className="certs__cmd fade" style={{ ["--d" as string]: 1 }}>
          <code>actions/upload-artifact@v4</code> · {badges.length} artifacts enviados
        </p>
      </div>
      <div className="marquee fade" style={{ ["--d" as string]: 2 }}>
        <ul className="marquee__track">
          {row.map((b, i) => (
            <li key={`${b.title}-${i}`} aria-hidden={i >= badges.length}>
              <a href={b.url} target="_blank" rel="noreferrer" title={`${b.title} — ${b.issuer}`} tabIndex={i >= badges.length ? -1 : 0}>
                <img src={b.image} alt={b.title} loading="lazy" className={b.shape === "selo" ? "is-badge" : ""} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
