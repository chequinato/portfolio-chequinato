import { Link } from "react-router-dom";
import { fmtDate, type Note } from "@/lib/notes";

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
        ler <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
