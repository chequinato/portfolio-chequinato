import { useGithub, eventLabel } from "@/lib/github";
import { relTime } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";

const stack = ["AWS", "Terraform", "Python", "SQL", "C#", ".NET", "TypeScript", "React", "Node.js", "FastAPI", "PostgreSQL", "Docker", "PHP", "MySQL", "Java"];

// Faixa de telemetria logo abaixo do hero: o último evento real do GitHub
// fixo à esquerda e a stack correndo como fita.
export function Ticker() {
  const gh = useGithub();
  const last = gh.events[0];
  const lbl = last ? eventLabel(last) : null;
  const items = [...stack, ...stack];
  return (
    <div className="band ticker" role="region" aria-label="Atividade recente">
      <div className="ticker__fixed">
        <span className={`led ${gh.live ? "" : "led--amber"}`} />
        <span className="mono-label">{gh.live ? "ao vivo" : "snapshot"}</span>
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
              <TechIcon name={s} size={16} title={false} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
