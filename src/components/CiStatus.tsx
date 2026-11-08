import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { StatusIcon, type Status } from "./StatusIcon";

// Status da pipeline DE VERDADE: a última execução do workflow
// .github/workflows/portfolio.yml, lida da API pública do GitHub.
type Run = { status: Status; label: string; when: string; url: string };

const REPO = `${profile.github}/portfolio-chequinato`;

function ago(iso: string) {
  const m = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 60) return `há ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.round(h / 24);
  return `há ${d} ${d === 1 ? "dia" : "dias"}`;
}

export function CiStatus() {
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/repos/${REPO}/actions/workflows/portfolio.yml/runs?per_page=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const r = d.workflow_runs?.[0];
        if (!alive || !r) return;
        const ok = r.conclusion === "success";
        const running = r.status !== "completed";
        if (!ok && !running) return; // só mostra quando há algo bom para mostrar
        setRun({
          status: running ? "running" : "success",
          label: running ? "rodando agora" : "passou",
          when: ago(r.updated_at),
          url: r.html_url,
        });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!run) return null;
  return (
    <a className="ci-status" href={run.url} target="_blank" rel="noreferrer" title="Última execução real no GitHub Actions">
      <StatusIcon s={run.status} size={13} />
      CI real {run.label} · {run.when} <span aria-hidden>↗</span>
    </a>
  );
}
