import { badges } from "@/data/career";

// Faixa infinita com os certificados: sem texto, só as imagens.
// Passar o mouse pausa; clicar abre a verificação.
export function Certificates() {
  const row = [...badges, ...badges];
  return (
    <section id="certificados" className="certs" aria-label="Certificados">
      <div className="container certs__head">
        <span className="eyebrow">certificações</span>
      </div>
      <div className="marquee">
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
