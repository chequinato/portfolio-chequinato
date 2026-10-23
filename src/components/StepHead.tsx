import type { ReactNode } from "react";
import { sections, sectionIndex, type SectionId } from "@/data/sections";
import { StatusIcon, fmtDur, usePipeline } from "@/lib/pipeline";

// Cabeçalho de seção desenhado como o passo de um job: ícone de estado,
// nome do job, título, fio, informação à direita e duração real. Embaixo,
// a linha de comando que o job "executou".
export function StepHead({ id, right, zone = false }: { id: SectionId; right?: ReactNode; zone?: boolean }) {
  const p = usePipeline();
  const i = sectionIndex(id);
  const s = sections[i];
  const st = p.status(i);
  return (
    <div className={`step ${zone ? "step--zone" : ""} is-${st}`}>
      <div className="step__row">
        <StatusIcon s={st} />
        <span className="idx">{s.n}</span>
        <span className="step__job mono">{s.job}</span>
        <span className="mono-label step__label">{s.label}</span>
        <span className="sec-head__rule rv-rule" />
        {right && <span className="mono-label step__right">{right}</span>}
        <span className="step__dur mono">{st === "queued" ? "—" : fmtDur(p.durations[i])}</span>
      </div>
      <div className="step__log mono">
        <span className="step__prompt">$</span> {s.log}
        {st === "running" && <span className="step__caret">▍</span>}
        {st === "success" && <span className="step__ok">  ✓ ok</span>}
      </div>
    </div>
  );
}
