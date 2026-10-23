import { sections } from "@/data/sections";
import { badges } from "@/data/career";
import { StatusIcon, fmtDur, usePipeline } from "@/lib/pipeline";

// O quadro de resumo que o GitHub mostra no topo de uma execução: gatilho,
// estado, duração total e artifacts. Aqui, tudo vivo: o estado e a duração
// acompanham o visitante descendo a página.
export function RunSummary() {
  const p = usePipeline();
  const ok = sections.filter((_, i) => p.status(i) === "success").length;
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  return (
    <div className="runsum rv-wipe" role="group" aria-label="Resumo da execução">
      <div>
        <span className="mono-label">Triggered via push</span>
        <span className="runsum__v mono">
          chequinato → <b>main</b> · {today}
        </span>
      </div>
      <div>
        <span className="mono-label">Status</span>
        <span className={`runsum__v runsum__status ${p.done ? "is-ok" : "is-run"}`}>
          <StatusIcon s={p.done ? "success" : "running"} size={14} />
          {p.done ? "Success" : "In progress"}
        </span>
      </div>
      <div>
        <span className="mono-label">Total duration</span>
        <span className="runsum__v mono">{fmtDur(p.total)}</span>
      </div>
      <div>
        <span className="mono-label">Jobs</span>
        <span className="runsum__v mono">
          {ok}/{sections.length}
          <span className="runsum__bar">
            <span style={{ transform: `scaleX(${ok / sections.length})` }} />
          </span>
        </span>
      </div>
      <div>
        <span className="mono-label">Artifacts</span>
        <a className="runsum__v mono" href="#credenciais">
          {badges.length} certificados · cv.pdf
        </a>
      </div>
    </div>
  );
}
