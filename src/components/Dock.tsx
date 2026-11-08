import { useRef, useState, type MouseEvent } from "react";
import { TechIcon, brandHex } from "@/lib/icons";
import { useReveal } from "@/lib/hooks";
import { RevealTitle } from "./RevealTitle";
import { JobHead } from "./JobHead";

// Tudo o que já apareceu em algum projeto, agrupado como apps no Dock do
// macOS. Os separadores dividem as categorias.
const groups = [
  { name: "Linguagens", items: ["Python", "TypeScript", "JavaScript", "Java", "C#", "PHP", "Kotlin", "SQL"] },
  { name: "Back-end", items: ["FastAPI", "Spring Boot", "Node.js", "NestJS", "Express", "Fastify", ".NET", "Django", "Laravel"] },
  { name: "Front-end", items: ["React", "Angular", "Next.js", "Vite", "Tailwind"] },
  { name: "Dados", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "DynamoDB", "Redis", "RabbitMQ", "Prisma", "SQLAlchemy", "pandas"] },
  { name: "Cloud & DevOps", items: ["AWS", "Lambda", "S3", "API Gateway", "SQS", "Terraform", "Docker", "GitHub Actions", "Git", "Linux", "Vercel"] },
  { name: "APIs & IA", items: ["OpenAPI", "Postman", "Insomnia", "pytest", "JUnit", "OpenAI", "Gemini", "Claude"] },
];

// Três prateleiras, duas categorias em cada.
const rows = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const total = groups.reduce((n, g) => n + g.items.length, 0);

// Marca de cor clara (ex.: amarelo do JavaScript) vira fundo do ícone,
// como um app de verdade; as outras ficam coloridas sobre o branco.
function isLight(hex?: string) {
  if (!hex) return false;
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

export function Dock() {
  const { ref, cls } = useReveal<HTMLElement>(0.2);
  const dock = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  // Ampliação: cada ícone cresce conforme a distância até o cursor.
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    dock.current?.querySelectorAll<HTMLElement>(".dock__app").forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      // Só amplia a fileira em que o mouse está (o dock quebra em linhas).
      const sameRow = Math.abs(e.clientY - (r.top + r.height / 2)) < r.height * 0.9;
      const k = sameRow ? Math.max(0, 1 - d / 140) : 0;
      el.style.setProperty("--s", String(1 + k * k * 0.75));
    });
  };
  const onLeave = () => {
    dock.current?.querySelectorAll<HTMLElement>(".dock__app").forEach((el) => el.style.setProperty("--s", "1"));
    setHover(null);
  };

  return (
    <section id="stack" ref={ref} className={`section stack-sec ${cls}`}>
      <div className="container sec-top sec-top--center">
        <JobHead id="stack" label="stack" />
        <RevealTitle text="Ferramentas que" accent="já usei." />
        <p className="sec-sub fade" style={{ ["--d" as string]: 3 }}>
          {total} tecnologias que aparecem nos meus projetos. <span className="sec-sub__hint">Passa o mouse 👀</span>
        </p>
      </div>

      <div className="dock-wrap fade" style={{ ["--d" as string]: 4 }}>
        <div className="dock" ref={dock} onMouseMove={onMove} onMouseLeave={onLeave}>
          {rows.map((row, ri) => (
            <ul key={ri} className="dock__row">
              {row.map((gi, k) => {
                const g = groups[gi];
                return (
                  <li key={g.name} className="dock__group" aria-label={g.name}>
                    {k > 0 && <span className="dock__sep" aria-hidden />}
                    {g.items.map((t) => (
                      <span
                        key={t}
                        className={`dock__app ${isLight(brandHex(t)) ? "dock__app--light" : ""}`}
                        onMouseEnter={() => setHover(t)}
                        style={{ ["--brand" as string]: brandHex(t) ?? "var(--accent)" }}
                      >
                        <span className={`dock__tip ${hover === t ? "is-on" : ""}`}>{t}</span>
                        <span className="dock__icon">
                          <TechIcon name={t} size={26} title={false} />
                        </span>
                      </span>
                    ))}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
