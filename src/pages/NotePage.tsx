import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { findNote, renderNote, fmtDate, notes } from "@/lib/notes";
import { useReveal } from "@/lib/hooks";
import NotFound from "./NotFound";

export default function NotePage() {
  const { slug = "" } = useParams();
  const note = findNote(slug);
  const { ref, cls } = useReveal<HTMLElement>(0.01);

  useEffect(() => {
    if (note) document.title = `${note.title} — Miguel Chequinato`;
    return () => {
      document.title = "Miguel Chequinato — Engenharia de Software";
    };
  }, [note]);

  if (!note) return <NotFound />;
  const i = notes.indexOf(note);
  const prev = notes[i + 1];
  const next = notes[i - 1];

  return (
    <article ref={ref} className={`sec article ${cls}`}>
      <div className="sec-head">
        <Link to="/notas" className="idx">← notas</Link>
        <span className="mono-label">{note.kind}</span>
        <span className="sec-head__rule rv-rule" />
        <span className="mono-label">{note.minutes} min de leitura</span>
      </div>
      <header className="article__head">
        <span className="mono-label">{fmtDate(note.date, true)}</span>
        <h1 className="article__title rv-cut">{note.title}</h1>
        {note.summary && <p className="serif-note rv" style={{ ["--i" as string]: 1 }}>{note.summary}</p>}
        <ul className="article__tags">
          {note.tags.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>
      </header>
      <div className="prose rv" style={{ ["--i" as string]: 2 }} dangerouslySetInnerHTML={{ __html: renderNote(note) }} />
      <nav className="article__nav">
        {prev ? (
          <Link to={`/notas/${prev.slug}`}>
            <span className="mono-label">← anterior</span>
            {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/notas/${next.slug}`} className="is-next">
            <span className="mono-label">próxima →</span>
            {next.title}
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
