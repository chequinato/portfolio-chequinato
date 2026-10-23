// A página é uma execução de pipeline: cada seção é um job, na ordem em que
// o visitante "roda" descendo a folha. `log` é a linha de comando que o job
// mostra no cabeçalho.
export const sections = [
  { id: "inicio", n: "00", label: "Início", job: "checkout", log: "git clone github.com/chequinato --since=2021" },
  { id: "agora", n: "01", label: "Agora", job: "setup-itau", log: "runner: itau-unibanco · squad híbrida · desde mai. 2026" },
  { id: "projetos", n: "02", label: "Projetos", job: "build", log: "make build --featured  →  5 sistemas" },
  { id: "arquivo", n: "03", label: "Arquivo", job: "archive", log: "tar -czf acervo.tgz ./projetos/*" },
  { id: "stack", n: "04", label: "Stack", job: "scan-stack", log: "stack-scan --sem-porcentagem --so-evidencia" },
  { id: "github", n: "05", label: "GitHub", job: "sync-github", log: "gh api users/chequinato --live" },
  { id: "publicacoes", n: "06", label: "Publicações", job: "publish", log: "linkedin publish --feed --public" },
  { id: "trajetoria", n: "07", label: "Trajetória", job: "git-log", log: "git log --graph --oneline --since=2021" },
  { id: "credenciais", n: "08", label: "Artifacts", job: "upload-artifacts", log: "actions/upload-artifact@v4  →  certificados/" },
  { id: "notas", n: "09", label: "Notas", job: "docs", log: "docs build ./notas" },
  { id: "contato", n: "10", label: "Deploy", job: "deploy", log: "deploy --env=production --target=você" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export const sectionIndex = (id: SectionId) => sections.findIndex((s) => s.id === id);
