import { timeline } from "@/data/career";
import { useReveal } from "@/lib/hooks";
import { SectionHead } from "./SectionHead";

// Trajetória em linha do tempo vertical, do mais recente ao mais antigo.
export function Timeline() {
  const { ref, cls } = useReveal<HTMLElement>(0.08);
  const items = [...timeline].reverse();

  return (
    <section id="trajetoria" ref={ref} className={`section section--tint ${cls}`}>
      <div className="container">
        <SectionHead
          center
          eyebrow="trajetória"
          title={
            <>
              O caminho <span className="accent">até aqui</span>
            </>
          }
        />

        <ol className="timeline">
          {items.map((m, i) => (
            <li key={m.title} className={`tl fade ${m.current ? "is-current" : ""}`} style={{ ["--d" as string]: i }}>
              <span className="tl__dot" aria-hidden />
              <div className="tl__when">{m.when}</div>
              <div className="card tl__card">
                <div className="tl__head">
                  <h3>{m.title}</h3>
                  {m.current && <span className="pill pill--soft">agora</span>}
                </div>
                <span className="tl__place">{m.place}</span>
                <p>{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
