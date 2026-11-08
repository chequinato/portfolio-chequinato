// Os três estados de um job no GitHub Actions, desenhados em SVG.
export type Status = "queued" | "running" | "success";

export function StatusIcon({ s, size = 16 }: { s: Status; size?: number }) {
  if (s === "success") {
    return (
      <svg className="st st--ok" width={size} height={size} viewBox="0 0 16 16" aria-label="concluído">
        <circle cx="8" cy="8" r="8" />
        <path d="M4.6 8.3l2.2 2.2 4.6-4.8" />
      </svg>
    );
  }
  if (s === "running") {
    return (
      <svg className="st st--run" width={size} height={size} viewBox="0 0 16 16" aria-label="em andamento">
        <circle cx="8" cy="8" r="6.5" className="st__track" />
        <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" className="st__arc" />
        <circle cx="8" cy="8" r="2" className="st__core" />
      </svg>
    );
  }
  return (
    <svg className="st st--queue" width={size} height={size} viewBox="0 0 16 16" aria-label="na fila">
      <circle cx="8" cy="8" r="6.5" />
    </svg>
  );
}
