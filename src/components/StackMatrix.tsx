import { useMemo, useState } from "react";
import { allProjects, featured } from "@/data/projects";
import { useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

// Sem barra de porcentagem: cada tecnologia aponta para os projetos em que
// foi usada de verdade. Linhas = tecnologias, colunas = projetos.

const groups: { name: string; techs: string[] }[] = [
  { name: "Cloud & infra", techs: ["AWS", "Lambda", "S3", "API Gateway", "SQS", "SNS", "CloudWatch", "Terraform", "Docker", "GitHub Actions"] },
  { name: "Linguagens", techs: ["Python", "C#", "TypeScript", "JavaScript", "Java", "Kotlin", "PHP", "T-SQL"] },
  { name: "Back-end", techs: [".NET", "FastAPI", "Node.js", "Express", "Fastify", "NestJS", "Django", "Prisma", "SQLAlchemy", "EF Core"] },
  { name: "Dados", techs: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "pandas", "Plotly", "Jupyter", "Streamlit"] },
  { name: "Front & mobile", techs: ["React", "Next.js", "Angular", "Vite", "Tailwind", "Android", "Supabase"] },
  { name: "IA, testes & integrações", techs: ["ML.NET", "OpenAI", "Gemini", "SignalR", "Stripe", "JWT", "xUnit", "pytest"] },
];

const label = (t: string) => (t === "T-SQL" ? "SQL" : t);

export function StackMatrix() {
  const { ref, cls } = useReveal<HTMLElement>(0.08);
  const projects = useMemo(() => allProjects(), []);
  const [row, setRow] = useState<string | null>(null);
  const [col, setCol] = useState<string | null>(null);

  const uses = (t: string) => projects.filter((p) => p.stack.includes(t) || (t === "T-SQL" && p.stack.includes("SQL")));
  const shown = groups.map((g) => ({ ...g, techs: g.techs.filter((t) => uses(t).length > 0) }));
  const techCount = shown.reduce((a, g) => a + g.techs.length, 0);
  const langCount = shown[1].techs.length;

  const readout = row
    ? { k: label(row), v: `${uses(row).length} projeto${uses(row).length > 1 ? "s" : ""}`, list: uses(row).map((p) => p.title) }
    : col
      ? (() => {
          const p = projects.find((x) => x.id === col)!;
          return { k: p.title, v: `${p.stack.length} tecnologias`, list: p.stack.map(label) };
        })()
      : null;

  const href = (id: string) => (featured.some((f) => f.id === id) ? `#p-${id}` : "#arquivo");

  let cellIdx = 0;

  return (
    <section id="stack" ref={ref} className={`sec stack ${cls}`}>
      <div className="sec-head">
        <span className="idx">04</span>
        <span className="mono-label">Stack · sem porcentagem</span>
        <span className="sec-head__rule rv-rule" />
        <span className="mono-label">{techCount} tecnologias · {projects.length} projetos</span>
      </div>

      <div className="stack__top">
        <h2 className="display display--m rv-cut">
          Nada de barra de 80%. <br />
          <em>Só evidência.</em>
        </h2>
        <div className="stack__nums">
          <div><span className="num">{techCount}</span><span className="mono-label">tecnologias usadas em projeto</span></div>
          <div><span className="num">{langCount}</span><span className="mono-label">linguagens</span></div>
          <div><span className="num">{projects.length}</span><span className="mono-label">projetos públicos</span></div>
        </div>
      </div>

      <div className="matrix-wrap">
        <div className="readout" aria-live="polite">
          {readout ? (
            <>
              <span className="readout__k">{readout.k}</span>
              <span className="mono-label">{readout.v}</span>
              <span className="readout__list">{readout.list.join(" · ")}</span>
            </>
          ) : (
            <span className="mono-label">passe o mouse numa tecnologia ou num projeto ↘</span>
          )}
        </div>

        <div className="matrix-scroll">
          <table className="matrix" onMouseLeave={() => { setRow(null); setCol(null); }}>
            <thead>
              <tr>
                <th className="matrix__corner" />
                {projects.map((p) => (
                  <th
                    key={p.id}
                    className={`matrix__col ${col === p.id ? "is-on" : ""} ${row && p.stack.includes(row) ? "is-hit" : ""} ${p.featured ? "is-featured" : ""}`}
                    onMouseEnter={() => { setCol(p.id); setRow(null); }}
                  >
                    <a href={href(p.id)}><span>{p.title}</span></a>
                  </th>
                ))}
              </tr>
            </thead>
            {shown.map((g) => (
              <tbody key={g.name}>
                <tr className="matrix__group">
                  <th colSpan={projects.length + 1} className="mono-label">{g.name}</th>
                </tr>
                {g.techs.map((t) => (
                  <tr key={t} className={row === t ? "is-on" : ""} onMouseEnter={() => { setRow(t); setCol(null); }}>
                    <th className={`matrix__tech ${col && projects.find((p) => p.id === col)?.stack.includes(t) ? "is-hit" : ""}`}>
                      <TechIcon name={t} size={15} title={false} />
                      <span>{label(t)}</span>
                      <em className="mono">{uses(t).length}</em>
                    </th>
                    {projects.map((p, j) => {
                      const on = p.stack.includes(t);
                      const i = cellIdx++;
                      return (
                        <td key={p.id} className={`${on ? "is-used" : ""} ${col === p.id ? "is-col" : ""}`}>
                          {on && <span className="cell" style={{ ["--d" as string]: `${(j + i / projects.length) * 22}ms` }} />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
