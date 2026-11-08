import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { timeline, badges } from "@/data/career";
import { profile } from "@/data/profile";
import { useReveal } from "@/lib/hooks";
import { RevealTitle } from "./RevealTitle";
import { StatusIcon, type Status } from "./StatusIcon";
import { JobHead } from "./JobHead";

// A trajetória como uma execução do GitHub Actions: cada marco é um job,
// as colunas rodam em sequência quando a seção aparece e os jobs atuais
// (faculdade e estágio) ficam "rodando". Clicar num job abre o log dele.

const cols = [0, 1, 2, 3] as const;
const edges: [string, string][] = [
  ["init", "tecnico-logistica"],
  ["init", "menor-aprendiz"],
  ["tecnico-logistica", "assistente-ti"],
  ["menor-aprendiz", "assistente-ti"],
  ["assistente-ti", "faculdade"],
  ["assistente-ti", "estagio-itau"],
];
const LAST = 3;

export function Experience() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.25);
  const [phase, setPhase] = useState(-1);
  const [sel, setSel] = useState("estagio-itau");
  const graph = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<string, HTMLButtonElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; from: string }[]>([]);

  // Roda as colunas em sequência: fila → rodando → concluído.
  useEffect(() => {
    if (!inView) return;
    setPhase(0);
    const timers = cols.slice(1).map((c) => setTimeout(() => setPhase(c), c * 1300));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const statusOf = (col: number, current?: boolean): Status => {
    if (col < phase) return "success";
    if (col === phase) return current || col < LAST ? "running" : "success";
    return "queued";
  };

  // Liga os jobs com curvas, medindo onde cada caixa ficou na tela.
  const measure = useCallback(() => {
    const g = graph.current;
    if (!g) return;
    const gr = g.getBoundingClientRect();
    const out = edges.flatMap(([a, b]) => {
      const A = nodes.current[a]?.getBoundingClientRect();
      const B = nodes.current[b]?.getBoundingClientRect();
      if (!A || !B) return [];
      if (B.left >= A.right - 2) {
        const x1 = A.right - gr.left, y1 = A.top + A.height / 2 - gr.top;
        const x2 = B.left - gr.left, y2 = B.top + B.height / 2 - gr.top;
        const mx = (x1 + x2) / 2;
        return [{ from: a, d: `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}` }];
      }
      const x1 = A.left + 28 - gr.left, y1 = A.bottom - gr.top;
      const x2 = B.left + 28 - gr.left, y2 = B.top - gr.top;
      const my = (y1 + y2) / 2;
      return [{ from: a, d: `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}` }];
    });
    setPaths(out);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (graph.current) ro.observe(graph.current);
    return () => ro.disconnect();
  }, [measure]);

  const colOf = (job: string) => timeline.find((m) => m.job === job)?.col ?? 0;
  const job = timeline.find((m) => m.job === sel)!;
  const running = phase >= LAST;

  return (
    <section id="experiencia" ref={ref} className={`section container ${cls}`}>
      <div className="sec-top">
        <JobHead id="experiencia" label="experiência" />
        <RevealTitle text="O caminho" accent="até aqui." />
      </div>

      <div className="run fade" style={{ ["--d" as string]: 2 }}>
        <header className="run__head">
          <div className="run__title">
            <StatusIcon s={phase < 0 ? "queued" : "running"} size={22} />
            <div>
              <strong>carreira.yml</strong>
              <span>
                on: push · <b>{profile.github}</b> pushed <code>main</code>
              </span>
            </div>
          </div>
          <dl className="run__meta">
            <div>
              <dt>Status</dt>
              <dd>{running ? "Em andamento" : phase < 0 ? "Na fila" : "Rodando…"}</dd>
            </div>
            <div>
              <dt>Duração</dt>
              <dd>{new Date().getFullYear() - profile.since} anos</dd>
            </div>
            <div>
              <dt>Artifacts</dt>
              <dd>
                <a href="#certificados">{badges.length} certificados</a>
              </dd>
            </div>
          </dl>
        </header>

        <div className="graph" ref={graph}>
          <svg className="graph__lines" aria-hidden>
            {paths.map((p, i) => (
              <path key={i} d={p.d} className={colOf(p.from) < phase ? "is-done" : ""} />
            ))}
          </svg>
          {cols.map((c) => (
            <div key={c} className="graph__col">
              {timeline
                .filter((m) => m.col === c)
                .map((m) => {
                  const st = statusOf(c, m.current);
                  return (
                    <button
                      key={m.job}
                      ref={(el) => (nodes.current[m.job] = el)}
                      className={`job job--${st} ${sel === m.job ? "is-sel" : ""}`}
                      onClick={() => setSel(m.job)}
                      aria-pressed={sel === m.job}
                    >
                      <StatusIcon s={st} />
                      <span className="job__name">{m.job}</span>
                      <span className="job__dur">{st === "queued" ? "" : m.dur}</span>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        <div className="log" key={sel}>
          <div className="log__bar">
            <span className="log__chev">▾</span>
            <strong>{job.job}</strong>
            <span className="log__right">
              {job.current ? "rodando agora" : `concluído em ${job.dur}`}
            </span>
          </div>
          <ol className="log__lines">
            <li style={{ ["--i" as string]: 0 }}>
              <StatusIcon s="success" size={13} /> Set up job
            </li>
            <li style={{ ["--i" as string]: 1 }}>
              <span className="log__k">title</span> {job.title}
            </li>
            <li style={{ ["--i" as string]: 2 }}>
              <span className="log__k">where</span> {job.place}
            </li>
            <li style={{ ["--i" as string]: 3 }}>
              <span className="log__k">when</span> {job.when}
            </li>
            <li style={{ ["--i" as string]: 4 }} className="log__echo">
              {job.body}
            </li>
            {job.stack && (
              <li style={{ ["--i" as string]: 5 }}>
                <span className="log__k">stack</span> {job.stack.join(" · ")}
              </li>
            )}
            <li style={{ ["--i" as string]: 6 }}>
              <StatusIcon s={job.current ? "running" : "success"} size={13} />{" "}
              {job.current ? "Em andamento…" : "Complete job"}
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
