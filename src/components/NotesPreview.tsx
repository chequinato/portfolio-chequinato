import { Link } from "react-router-dom";
import { notes, fmtDate } from "@/lib/notes";
import { useReveal } from "@/lib/hooks";

export function NoteRow({ n, i }: { n: (typeof notes)[number]; i: number }) {
  return (
    <li className="note-row rv-wipe" style={{ ["--i" as string]: i }}>
      <Link to={`/notas/${n.slug}`}>
        <span className="note-row__date mono">{fmtDate(n.date)}</span>
        <span className="note-row__kind mono-label">{n.kind}</span>
        <span className="note-row__title">{n.title}</span>
        <span className="note-row__sum">{n.summary}</span>
        <span className="note-row__min mono">{n.minutes} min →</span>
      </Link>
    </li>
  );
}

export function NotesPreview() {
  const { ref, cls } = useReveal<HTMLElement>(0.1);
  return (
    <section id="notas" ref={ref} className={`sec notes ${cls}`}>
      <div className="sec-head">
        <span className="idx">08</span>
        <span className="mono-label">Notas · estudos e atualizações</span>
        <span className="sec-head__rule rv-rule" />
        <Link className="mono-label link-quiet" to="/notas">
          todas ({notes.length}) →
        </Link>
      </div>
      <div className="notes__top">
        <h2 className="display display--m rv-cut">
          Escrevo o que <br />
          <em>aprendo.</em>
        </h2>
        <p className="serif-note rv" style={{ ["--i" as string]: 1 }}>
          Diário de bordo: o que estou estudando, o que deu errado e o porquê das decisões em cada projeto.
        </p>
      </div>
      <ol className="note-list">
        {notes.slice(0, 4).map((n, i) => (
          <NoteRow key={n.slug} n={n} i={i} />
        ))}
      </ol>
    </section>
  );
}
