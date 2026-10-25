import type { ReactNode } from "react";
import { sections, sectionIndex, type SectionId } from "@/data/sections";
import { StatusIcon, fmtDur, usePipeline } from "@/lib/pipeline";

// Cabeçalho de seção desenhado como o passo de um job: estado, número e
// nome do job, o que a seção é, um fio, informação à direita e a duração
// real. Embaixo, discreta, a linha de comando que o job "executou".
export function StepHead({ id, right, zone = false }: { id: SectionId; right?: ReactNode; zone?: boolean }) {
  const p = usePipeline();
  const i = sectionIndex(id);
  const s = sections[i];
  const st = p.status(i);
  return (
    <div className={`step ${zone ? "step--zone" : ""} is-${st}`}>
      <div className="step__row mono">
        <StatusIcon s={st} size={17} />
        <b className="step__job">
          {s.n} · {s.job}
        </b>
        <span className="step__label">{s.label.toLowerCase()}</span>
        <span className="sec-head__rule rv-rule" />
        {right && <span className="step__right">{right}</span>}
        <span className="step__dur">{st === "queued" ? "—" : fmtDur(p.durations[i])}</span>
      </div>
      <div className="step__log mono">
        <span className="step__prompt">$</span> {s.log}
        {st === "running" && <span className="step__caret">▍</span>}
        {st === "success" && <span className="step__ok"> ✓</span>}
      </div>
    </div>
  );
}
