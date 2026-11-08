import { Link } from "react-router-dom";
import { notes, fmtDate, type Note } from "@/lib/notes";
import { useReveal } from "@/lib/hooks";
import { SectionHead } from "./SectionHead";

export function NoteCard({ n }: { n: Note }) {
  return (
    <Link to={`/notas/${n.slug}`} className="card note-card">
      <div className="note-card__top">
        <span className="pill pill--soft">{n.kind}</span>
        <span className="note-card__date">{fmtDate(n.date, true)}</span>
      </div>
      <h3>{n.title}</h3>
      <p>{n.summary}</p>
      <span className="link">
        ler · {n.minutes} min <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export function NotesPreview() {
  const { ref, cls } = useReveal<HTMLElement>(0.1);
  if (!notes.length) return null;

  return (
    <section id="notas" ref={ref} className={`section container ${cls}`}>
      <div className="split-head">
        <SectionHead
          eyebrow="notas"
          title={
            <>
              Escrevo o que <span className="accent">aprendo</span>
            </>
          }
        />
        <Link to="/notas" className="link">
          todas as notas <span aria-hidden>→</span>
        </Link>
      </div>
      <div className="notes-grid">
        {notes.slice(0, 3).map((n) => (
          <NoteCard key={n.slug} n={n} />
        ))}
      </div>
    </section>
  );
}
