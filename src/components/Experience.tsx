import { timeline } from "@/data/career";
import { useReveal } from "@/lib/hooks";

// Só o essencial de cada marco: quando, o quê e onde.
export function Experience() {
  const { ref, cls } = useReveal<HTMLElement>(0.15);
  const items = [...timeline].reverse();

  return (
    <section id="experiencia" ref={ref} className={`section container ${cls}`}>
      <div className="exp">
        <div>
          <span className="eyebrow fade">experiência</span>
          <h2 className="sec-title fade" style={{ ["--d" as string]: 1 }}>
            O caminho <span className="accent">até aqui.</span>
          </h2>
        </div>

        <ol className="exp__list">
          {items.map((m, i) => (
            <li key={m.title} className="fade" style={{ ["--d" as string]: i + 1 }}>
              <div className={`exp__item ${m.current ? "is-current" : ""}`}>
                <span className="exp__when">{m.when}</span>
                <span className="exp__title">{m.title}</span>
                <span className="exp__place">{m.place}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
