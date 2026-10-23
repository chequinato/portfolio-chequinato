import { badges, courses } from "@/data/career";
import { links } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

const issuerIcon: Record<string, string> = { Itaú: "", Udemy: "Udemy", Alura: "", Outro: "" };

export function Credentials() {
  const { ref, cls } = useReveal<HTMLElement>(0.1);
  return (
    <section id="credenciais" ref={ref} className={`sec creds ${cls}`}>
      <div className="sec-head">
        <span className="idx">07</span>
        <span className="mono-label">Credenciais & cursos</span>
        <span className="sec-head__rule rv-rule" />
        <a className="mono-label link-quiet" href={links.credly} target="_blank" rel="noreferrer">
          verificáveis no Credly ↗
        </a>
      </div>

      <h2 className="display display--m rv-cut">
        Selos que dá <em>para conferir.</em>
      </h2>

      <ul className="badges">
        {badges.map((b, i) => (
          <li key={b.url} className="badge rv-cut" style={{ ["--i" as string]: i + 1 }}>
            <a href={b.url} target="_blank" rel="noreferrer">
              <div className="badge__img">
                <img src={b.image} alt={`Selo ${b.title}`} loading="lazy" width={170} height={170} />
              </div>
              <div className="badge__meta">
                <span className="mono-label">{b.issuer} · {b.date.replace("-", "/").split("/").reverse().join("/")}</span>
                <h3>{b.title}</h3>
                <span className="badge__skills">{b.skills.join(" · ")}</span>
                <span className="mono-label badge__verify">verificar ↗</span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {courses.length > 0 && (
        <div className="courses">
          <span className="mono-label">Cursos</span>
          <ul>
            {courses.map((c, i) => (
              <li key={c.title} className="rv-wipe" style={{ ["--i" as string]: i }}>
                <span className="courses__issuer mono">
                  {issuerIcon[c.issuer] ? <TechIcon name={issuerIcon[c.issuer]} size={13} title={false} /> : null}
                  {c.issuer}
                </span>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer">{c.title}</a>
                ) : (
                  <span>{c.title}</span>
                )}
                <span className="mono courses__year">{c.year ?? ""}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a className="link-arrow creds__more" href={`${links.linkedin}details/certifications/`} target="_blank" rel="noreferrer">
        Todos os certificados no LinkedIn <span aria-hidden>↗</span>
      </a>
    </section>
  );
}
