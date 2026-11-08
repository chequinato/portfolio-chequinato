import { jobs, usePipeline, type JobId } from "@/lib/pipeline";
import { StatusIcon } from "./StatusIcon";
import { Scramble } from "./Scramble";

// Cabeçalho de seção no formato de um job do Actions:
// [status] build · projetos ··················· 12s
export function JobHead({ id, label }: { id: JobId; label?: string }) {
  const run = usePipeline();
  const job = jobs.find((j) => j.id === id)!;
  const st = run.status(id);
  const n = jobs.findIndex((j) => j.id === id);

  return (
    <div className={`jobhead jobhead--${st} fade`}>
      <span className="jobhead__icon" key={st}>
        <StatusIcon s={st} size={16} />
      </span>
      <span className="jobhead__n">{String(n + 1).padStart(2, "0")}</span>
      <code className="jobhead__job">
        <Scramble text={job.job} trigger={st} />
      </code>
      <span className="jobhead__label">{label ?? job.label}</span>
      <span className="jobhead__rule" aria-hidden />
      <span className="jobhead__dur">{st === "queued" ? "na fila" : run.duration(id)}</span>
    </div>
  );
}
