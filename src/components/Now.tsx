import { nowStack, profile } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

export function Now() {
  const { ref, cls } = useReveal<HTMLElement>();
  return (
    <section id="agora" ref={ref} className={`sec now ${cls}`}>
      <div className="sec-head">
        <span className="idx">01</span>
        <span className="mono-label">Agora</span>
        <span className="sec-head__rule rv-rule" />
        <span className="mono-label">desde 2026</span>
      </div>

      <div className="now__top">
        <div className="now__badge rv-cut">
          <img src="/itau.svg" alt="Itaú Unibanco" className="now__logo" />
          <div>
            <div className="now__co">{profile.company}</div>
            <div className="mono-label">{profile.role}</div>
          </div>
        </div>

        <h2 className="now__statement rv-cut" style={{ ["--i" as string]: 1 }}>
          Entrei no Itaú com <em>1 semana</em> de faculdade.
        </h2>
        <p className="serif-note now__note rv" style={{ ["--i" as string]: 2 }}>
          O primeiro semestre de Engenharia de Software mal tinha começado. Hoje divido a semana entre o estágio e a
          UniAnchieta — e o que aprendo de um lado vira projeto do outro.
        </p>
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
    </section>
  );
}
