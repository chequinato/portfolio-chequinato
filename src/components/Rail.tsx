import { Link, useLocation } from "react-router-dom";
import { sections } from "@/data/sections";
import { spTime, useClock, type Mode } from "@/lib/hooks";
import { StatusIcon, fmtDur, usePipeline } from "@/lib/pipeline";

// A esteira: a run do portfólio como uma linha de estações. Concluídas
// ficam pretas com check, a que está rodando abre em bloco com o comando e
// o progresso real da seção, as da fila ficam vazias. A linha preta avança
// conforme o visitante desce.
export function Rail({ mode, onToggle }: { mode: Mode; onToggle: () => void }) {
  const now = useClock();
  const p = usePipeline();
  const { pathname } = useLocation();
  const home = pathname === "/";
  const doneCount = sections.filter((_, i) => p.status(i) === "success").length;
  const current = sections[p.active];
  // Até onde a linha preta vai: estações concluídas + o trecho do job ativo.
  const reach = home ? (p.active + p.progress) / (sections.length - 1) : 1;

  return (
    <aside className="rail" aria-label="Execução do portfólio">
      <div className="rail__top">
        <Link to="/" className="rail__mark" aria-label="Início">
          mc
        </Link>
        <div className="rail__run">
          <span className="rail__file mono">portfolio.yml</span>
          <span className={`run-pill ${p.done ? "is-ok" : "is-run"}`}>
            <StatusIcon s={p.done ? "success" : "running"} size={11} />
            {p.done ? "success" : "in progress"}
          </span>
        </div>
      </div>

      <div className="rail__meta mono">
        <span>
          {doneCount}/{sections.length} jobs
        </span>
        <span>{fmtDur(p.total)}</span>
      </div>

      <ol className="jobs" aria-label="Jobs" style={{ ["--reach" as string]: Math.min(1, reach) }}>
        {sections.map((s, i) => {
          const st = p.status(i);
          const active = home && i === p.active;
          return (
            <li key={s.id} className={`job is-${st} ${active ? "is-active" : ""}`}>
              <Link to={`/#${s.id}`} aria-current={active ? "step" : undefined}>
                <span className="job__dot" aria-hidden />
                <span className="job__body">
                  <span className="job__text">
                    <span className="job__name">{s.job}</span>
                    <span className="job__label">{s.label.toLowerCase()}</span>
                  </span>
                  <span className="job__dur mono">{st === "queued" ? "—" : fmtDur(p.durations[i])}</span>
                  {active && (
                    <span className="job__detail mono" aria-hidden>
                      <span className="job__bar">
                        <span style={{ transform: `scaleX(${p.progress})` }} />
                      </span>
                      <span className="job__cmd">
                        <span>$ {s.log}</span>
                        <span>{Math.round(p.progress * 100)}%</span>
                      </span>
                    </span>
                  )}
                </span>
                <span className="job__tip">{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="rail__now mono" aria-hidden>
        <StatusIcon s={p.status(p.active)} size={12} />
        <span>{home ? current.job : "notas"}</span>
        <span className="rail__bar">
          <span style={{ transform: `scaleX(${doneCount / sections.length})` }} />
        </span>
      </div>

      <div className="rail__foot">
        <span className="rail__clock mono" title="Horário de São Paulo">
          <span className="led" />
          {spTime(now)} · são paulo
        </span>
        <button
          className="mode-btn"
          onClick={onToggle}
          aria-label={mode === "ink" ? "Mudar para modo claro" : "Mudar para modo escuro"}
          title={mode === "ink" ? "Modo claro" : "Modo escuro"}
        />
      </div>
    </aside>
  );
}
