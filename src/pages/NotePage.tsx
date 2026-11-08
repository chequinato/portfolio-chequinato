import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { findNote, renderNote, fmtDate, notes } from "@/lib/notes";
import NotFound from "./NotFound";

export default function NotePage() {
  const { slug = "" } = useParams();
  const note = findNote(slug);

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
    <article className="section page article container">
      <Link to="/notas" className="link link--muted article__back">
        <span aria-hidden>←</span> todas as notas
      </Link>
      <header className="article__head">
        <div className="article__meta">
          <span className="pill pill--soft">{note.kind}</span>
          <span>{fmtDate(note.date, true)}</span>
          <span>·</span>
          <span>{note.minutes} min de leitura</span>
        </div>
        <h1 className="article__title">{note.title}</h1>
        {note.summary && <p className="article__summary">{note.summary}</p>}
        <ul className="chips">
          {note.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderNote(note) }} />
      <nav className="article__nav">
        {prev ? (
          <Link to={`/notas/${prev.slug}`} className="card">
            <span>← anterior</span>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/notas/${next.slug}`} className="card is-next">
            <span>próxima →</span>
            {next.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
