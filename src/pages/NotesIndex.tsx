import { useState } from "react";
import { notes } from "@/lib/notes";
import { NoteRow } from "@/components/NotesPreview";
import { useReveal } from "@/lib/hooks";

export default function NotesIndex() {
  const { ref, cls } = useReveal<HTMLElement>(0.02);
  const tags = Array.from(new Set(notes.flatMap((n) => n.tags))).sort();
  const [tag, setTag] = useState<string | null>(null);
  const list = notes.filter((n) => !tag || n.tags.includes(tag));

  return (
    <section ref={ref} className={`sec notes notes--page ${cls}`}>
      <div className="sec-head">
        <span className="idx">N</span>
        <span className="mono-label">Notas</span>
        <span className="sec-head__rule rv-rule" />
        <span className="mono-label">{notes.length} publicadas</span>
      </div>
      <h1 className="display rv-cut">
        Notas, estudos <br />e <em>atualizações.</em>
      </h1>
      <p className="serif-note rv notes__intro" style={{ ["--i" as string]: 1 }}>
        O que estou estudando, o que construí e o porquê das decisões. Escrito para eu lembrar — e para quem quiser
        acompanhar.
      </p>
      <div className="filters" role="toolbar" aria-label="Filtrar por assunto">
        <button className={`filter ${!tag ? "is-on" : ""}`} onClick={() => setTag(null)}>todas</button>
        {tags.map((t) => (
          <button key={t} className={`filter ${tag === t ? "is-on" : ""}`} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>
      <ol className="note-list">
        {list.map((n, i) => (
          <NoteRow key={n.slug} n={n} i={i} />
        ))}
      </ol>
    </section>
  );
}
