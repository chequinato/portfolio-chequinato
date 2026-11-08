import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { Status } from "@/components/StatusIcon";

// O portfólio inteiro é uma execução de workflow (portfolio.yml): cada
// seção é um job. Descendo a página, o job da seção vira "rodando" e o
// anterior fecha como concluído, com o tempo real que o visitante ficou nele.

export const jobs = [
  { id: "inicio", job: "checkout", label: "Início" },
  { id: "sobre", job: "setup", label: "Sobre" },
  { id: "projetos", job: "build", label: "Projetos" },
  { id: "stack", job: "install-deps", label: "Stack" },
  { id: "experiencia", job: "carreira", label: "Experiência" },
  { id: "certificados", job: "upload-artifacts", label: "Certificados" },
  { id: "contato", job: "deploy", label: "Contato" },
] as const;

export type JobId = (typeof jobs)[number]["id"];

type Run = {
  status: (id: JobId) => Status;
  duration: (id: JobId) => string;
  current: number;
  reached: number;
  done: boolean;
  waiting: boolean;
  total: string;
  approve: () => void;
};

const Ctx = createContext<Run | null>(null);

export function fmtDur(ms: number) {
  const s = Math.max(1, Math.round(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

export function PipelineProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(0);
  const [reached, setReached] = useState(0);
  const [done, setDone] = useState(false);
  const [, tick] = useState(0);
  const startedAt = useRef<number[]>([performance.now()]);
  const endedAt = useRef<number | null>(null);

  // Qual seção está no meio da tela.
  useEffect(() => {
    if (pathname !== "/") return;
    const els = jobs.map((j) => document.getElementById(j.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = jobs.findIndex((j) => j.id === e.target.id);
          if (i >= 0) setCurrent(i);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // No fim da página o "deploy" sempre roda, mesmo sem cruzar o meio.
    const onScroll = () => {
      const end = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (end) setCurrent(jobs.length - 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Avança a run até a seção mais distante já vista.
  useEffect(() => {
    if (current <= reached) return;
    const now = performance.now();
    for (let i = reached + 1; i <= current; i++) startedAt.current[i] = now;
    setReached(current);
  }, [current, reached]);

  // O deploy é um environment protegido: só conclui quando o visitante
  // aprova (clicando no botão de contato).
  const approve = () => {
    if (done) return;
    const now = performance.now();
    for (let i = reached + 1; i < jobs.length; i++) startedAt.current[i] = now;
    setReached(jobs.length - 1);
    endedAt.current = now;
    setDone(true);
  };
  const waiting = reached === jobs.length - 1 && !done;

  // Atualiza o cronômetro do job que está rodando.
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  const status = (id: JobId): Status => {
    const i = jobs.findIndex((j) => j.id === id);
    if (i < reached || (done && i === reached)) return "success";
    if (i === reached) return "running";
    return "queued";
  };

  const duration = (id: JobId) => {
    const i = jobs.findIndex((j) => j.id === id);
    const start = startedAt.current[i];
    if (start === undefined || i > reached) return "";
    const end = i < reached ? startedAt.current[i + 1] : done ? endedAt.current! : performance.now();
    return fmtDur(end - start);
  };

  const total = fmtDur((done ? endedAt.current! : performance.now()) - startedAt.current[0]);

  return <Ctx.Provider value={{ status, duration, current, reached, done, waiting, total, approve }}>{children}</Ctx.Provider>;
}

export function usePipeline() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePipeline fora do PipelineProvider");
  return v;
}
