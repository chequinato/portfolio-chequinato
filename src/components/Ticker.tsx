import { useGithub, eventLabel } from "@/lib/github";
import { relTime } from "@/lib/hooks";

const stack = ["AWS", "Terraform", "Python", "SQL", "Event-driven", "Clean Architecture", "C#", ".NET", "TypeScript", "React", "FastAPI", "PostgreSQL", "Docker"];

// Faixa escura logo abaixo do hero: o último evento real do GitHub fixo à
// esquerda e a stack correndo em letra grande, separada por asteriscos.
export function Ticker() {
  const gh = useGithub();
  const last = gh.events[0];
  const lbl = last ? eventLabel(last) : null;
  const items = [...stack, ...stack];
  return (
    <div className="band ticker" role="region" aria-label="Atividade recente">
      <div className="ticker__fixed">
        <span className={`led ${gh.live ? "" : "led--amber"}`} />
        {last && lbl && (
          <span className="ticker__event mono">
            {lbl.verb} → <strong>{last.repo}</strong> · {relTime(last.at)}
          </span>
        )}
      </div>
      <div className="ticker__tape" aria-hidden>
        <div className="ticker__run">
          {items.map((s, i) => (
            <span key={i} className="ticker__item">
              {s}
              <i>✳</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
