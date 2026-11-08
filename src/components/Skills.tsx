import { useEffect, useMemo, useState } from "react";
import { skills, type Skill } from "@/data/skills";
import { useReveal } from "@/lib/hooks";
import { RevealTitle } from "./RevealTitle";
import { JobHead } from "./JobHead";

// O que eu sei fazer, escrito como skills do Claude: uma janela de editor
// com a pasta .claude/skills/ na lateral e o SKILL.md aberto ao lado.
// As skills trocam sozinhas até o visitante clicar em alguma.

type Line = { kind: "fence" | "key" | "blank" | "h1" | "h2" | "li"; k?: string; v: string };

function toLines(s: Skill): Line[] {
  const out: Line[] = [
    { kind: "fence", v: "---" },
    { kind: "key", k: "name", v: s.name },
    { kind: "key", k: "description", v: s.description },
    { kind: "fence", v: "---" },
    { kind: "blank", v: "" },
    { kind: "h1", v: s.title },
  ];
  s.sections.forEach((sec) => {
    out.push({ kind: "blank", v: "" }, { kind: "h2", v: sec.h });
    sec.items.forEach((it) => out.push({ kind: "li", v: it }));
  });
  return out;
}

function Code({ l }: { l: Line }) {
  switch (l.kind) {
    case "fence":
      return <span className="md-fence">---</span>;
    case "key":
      return (
        <>
          <span className="md-key">{l.k}</span>
          <span className="md-punct">:</span> <span className="md-val">{l.v}</span>
        </>
      );
    case "h1":
      return (
        <>
          <span className="md-hash"># </span>
          <span className="md-h1">{l.v}</span>
        </>
      );
    case "h2":
      return (
        <>
          <span className="md-hash">## </span>
          <span className="md-h2">{l.v}</span>
        </>
      );
    case "li":
      return (
        <>
          <span className="md-bullet">- </span>
          {l.v.includes("→") ? (
            <>
              <span className="md-strong">{l.v.split("→")[0].trim()}</span>
              <span className="md-arrow"> → </span>
              {l.v.split("→")[1].trim()}
            </>
          ) : (
            l.v
          )}
        </>
      );
    default:
      return <>&nbsp;</>;
  }
}

export function Skills() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.25);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const s = skills[i];
  const lines = useMemo(() => toLines(s), [s]);

  // Troca de skill sozinha enquanto ninguém clicou.
  useEffect(() => {
    if (!inView || !auto) return;
    const t = setTimeout(() => setI((n) => (n + 1) % skills.length), 6500);
    return () => clearTimeout(t);
  }, [inView, auto, i]);

  const pick = (n: number) => {
    setAuto(false);
    setI(n);
  };

  return (
    <section id="skills" ref={ref} className={`section container ${cls}`}>
      <div className="sec-top">
        <JobHead id="skills" label="skills" />
        <RevealTitle text="O que eu" accent="sei fazer." />
      </div>

      <div className="ide pop" style={{ ["--d" as string]: 2 }}>
        <div className="ide__bar">
          <span />
          <span />
          <span />
          <em>~/.claude/skills</em>
        </div>

        <div className="ide__body">
          <aside className="ide__tree" aria-label="Skills">
            <p className="ide__root">
              <span className="ide__chev">▾</span> .claude
            </p>
            <p className="ide__root ide__root--2">
              <span className="ide__chev">▾</span> skills
            </p>
            <ul>
              {skills.map((sk, n) => (
                <li key={sk.slug}>
                  <button className={n === i ? "is-on" : ""} onClick={() => pick(n)} aria-pressed={n === i}>
                    <span className="ide__folder" aria-hidden />
                    {sk.slug}
                    {n === i && auto && <span className="ide__timer" key={i} aria-hidden />}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="ide__editor">
            <div className="ide__tabs">
              <span className="ide__tab is-on">
                <span className="ide__md">M↓</span> {s.slug}/SKILL.md
              </span>
            </div>
            <ol className="ide__code" key={s.slug}>
              {lines.map((l, n) => (
                <li key={n} style={{ ["--i" as string]: n }}>
                  <Code l={l} />
                  {n === lines.length - 1 && <span className="ide__caret" aria-hidden />}
                </li>
              ))}
            </ol>
            <div className="ide__toast" key={`t-${s.slug}`} role="status">
              <span className="ide__ok">✓</span> skill carregada: <code>{s.name}</code>
            </div>
          </div>
        </div>

        <div className="ide__status">
          <span>
            <b>●</b> main
          </span>
          <span>{skills.length} skills</span>
          <span className="ide__status-right">
            Markdown · UTF-8 · Ln {lines.length}
          </span>
        </div>
      </div>
    </section>
  );
}
