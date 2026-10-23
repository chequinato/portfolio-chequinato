import { Link, useLocation } from "react-router-dom";
import { sections } from "@/data/sections";
import { spTime, useClock, type Mode } from "@/lib/hooks";
import { StatusIcon, fmtDur, usePipeline } from "@/lib/pipeline";

// O trilho é a barra lateral de uma execução do GitHub Actions: arquivo do
// workflow, estado da run e a lista de jobs com ícone e duração. O fio que
// liga os jobs vai ficando verde conforme o visitante desce a página.
export function Rail({ mode, onToggle }: { mode: Mode; onToggle: () => void }) {
  const now = useClock();
  const p = usePipeline();
  const { pathname } = useLocation();
  const home = pathname === "/";
  const doneCount = sections.filter((_, i) => p.status(i) === "success").length;
  const current = sections[p.active];

  return (
    <aside className="rail" aria-label="Execução do portfólio">
      <div className="rail__top">
        <Link to="/" className="rail__mono" aria-label="Início">
          <span>M</span>
          <span>C</span>
        </Link>
        <div className="rail__run">
          <span className="rail__file mono">portfolio.yml</span>
          <span className={`run-pill ${p.done ? "is-ok" : "is-run"}`}>
            <StatusIcon s={p.done ? "success" : "running"} size={12} />
            {p.done ? "Success" : "In progress"}
          </span>
        </div>
      </div>

      <div className="rail__meta mono">
        <span>
          {doneCount}/{sections.length} jobs
        </span>
        <span>{fmtDur(p.total)}</span>
      </div>

      <ol className="jobs" aria-label="Jobs">
        {sections.map((s, i) => {
          const st = p.status(i);
          return (
            <li key={s.id} className={`job is-${st} ${home && i === p.active ? "is-active" : ""}`}>
              <Link to={`/#${s.id}`} aria-current={home && i === p.active ? "step" : undefined}>
                <StatusIcon s={st} size={14} />
                <span className="job__name mono">{s.job}</span>
                <span className="job__dur mono">{st === "queued" ? "" : fmtDur(p.durations[i])}</span>
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
        <span className="rail__clock" title="Horário de São Paulo">
          <span className="led" />
          <span className="mono">{spTime(now)}</span>
        </span>
        <button
          className="mode-btn"
          onClick={onToggle}
          aria-label={mode === "ink" ? "Mudar para modo papel" : "Mudar para modo tinta"}
          title={mode === "ink" ? "Modo papel" : "Modo tinta"}
        />
      </div>
    </aside>
  );
}
