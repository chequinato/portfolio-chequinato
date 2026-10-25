import { StepHead } from "./StepHead";
import { nowStack, practices, profile } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

export function Now() {
  const { ref, cls } = useReveal<HTMLElement>();
  return (
    <section id="agora" ref={ref} className={`sec now ${cls}`}>
      <StepHead id="agora" right="desde mai. 2026" />

      <div className="now__top">
        <div>
          <h2 className="now__statement rv-cut" style={{ ["--i" as string]: 1 }}>
            Hoje, <em>no</em> {profile.company}.
          </h2>
          <p className="serif-note now__note rv" style={{ ["--i" as string]: 2 }}>
            {profile.role} numa squad híbrida — back-end em Python, infraestrutura em Terraform e serviços AWS. Divido
            a semana entre o estágio e a {profile.school}.
          </p>
        </div>
        <div className="now__logo rv-cut" style={{ ["--i" as string]: 2 }}>
          <img src="/itau.svg" alt="Itaú Unibanco" />
        </div>
      </div>

      <div className="now__grid">
        {nowStack.map((s, i) => (
          <article key={s.title} className="now__col rv-cut" style={{ ["--i" as string]: 3 + i }}>
            <header>
              <span className="mono-label">
                {String(i + 1).padStart(2, "0")} · {s.area}
              </span>
              <TechIcon name={s.title} size={22} className="now__icon" />
            </header>
            <h3 className="now__title">{s.title}</h3>
            <ul>
              {s.items.map((it, j) => (
                <li key={it} className="rv-wipe" style={{ ["--i" as string]: 6 + i * 2 + j }}>
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="practices">
        <div className="practices__head">
          <span className="mono-label">Como eu construo</span>
          <span className="sec-head__rule rv-rule" />
        </div>
        <ol className="practices__list">
          {practices.map((p, i) => (
            <li key={p.code} className="practice rv-cut" style={{ ["--i" as string]: 4 + i }}>
              <span className="practice__code mono">{p.code}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ul>
                {p.evidence.map((e) => (
                  <li key={e} className="mono">→ {e}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
