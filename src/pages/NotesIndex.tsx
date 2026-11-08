import { useState } from "react";
import { notes } from "@/lib/notes";
import { NoteCard } from "@/components/NotesPreview";
import { SectionHead } from "@/components/SectionHead";

export default function NotesIndex() {
  const tags = Array.from(new Set(notes.flatMap((n) => n.tags))).sort();
  const [tag, setTag] = useState<string | null>(null);
  const list = notes.filter((n) => !tag || n.tags.includes(tag));

  return (
    <section className="section page container is-in">
      <SectionHead
        eyebrow={`notas · ${notes.length} publicadas`}
        title={
          <>
            Notas, estudos <span className="accent">e atualizações</span>
          </>
        }
        intro="O que estou estudando, o que construí e o porquê das decisões."
      />
      <div className="filters" role="toolbar" aria-label="Filtrar por assunto">
        <button className={`filter ${!tag ? "is-on" : ""}`} onClick={() => setTag(null)}>
          todas
        </button>
        {tags.map((t) => (
          <button key={t} className={`filter ${tag === t ? "is-on" : ""}`} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="notes-grid">
        {list.map((n) => (
          <NoteCard key={n.slug} n={n} />
        ))}
      </div>
    </section>
  );
}
