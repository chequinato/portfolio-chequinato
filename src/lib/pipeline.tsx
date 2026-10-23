import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { sections } from "@/data/sections";

// O motor da "run": descobre qual job (seção) está rodando pela rolagem,
// guarda até onde o visitante já chegou e cronometra o tempo real que ele
// passou em cada job. Trilho, cabeçalhos e o resumo da run leem daqui.

export type JobStatus = "queued" | "running" | "success";

type Pipeline = {
  active: number;
  reached: number;
  done: boolean;
  durations: number[];
  total: number;
  status: (i: number) => JobStatus;
};

const Ctx = createContext<Pipeline | null>(null);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(0);
  const [done, setDone] = useState(false);
  const [durations, setDurations] = useState<number[]>(() => sections.map(() => 0));
  const activeRef = useRef(0);

  useEffect(() => {
    if (!home) return;
    const onScroll = () => {
      const mid = window.innerHeight * 0.38;
      let cur = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) cur = i;
      });
      const h = document.documentElement;
      const atBottom = h.scrollTop + window.innerHeight >= h.scrollHeight - 8;
      if (atBottom) cur = sections.length - 1;
      activeRef.current = cur;
      setActive(cur);
      setReached((r) => Math.max(r, cur));
      if (cur === sections.length - 1) setDone(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  // Cronômetro: soma o tempo ao job ativo enquanto a aba está visível.
  useEffect(() => {
    if (!home) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setDurations((d) => {
        const n = d.slice();
        n[activeRef.current] += 500;
        return n;
      });
    }, 500);
    return () => clearInterval(t);
  }, [home]);

  const status = (i: number): JobStatus => {
    if (!home) return "success";
    if (done && i === sections.length - 1) return "success";
    if (i === active) return "running";
    if (i <= reached) return "success";
    return "queued";
  };

  const total = durations.reduce((a, b) => a + b, 0);
  return <Ctx.Provider value={{ active, reached, done: done || !home, durations, total, status }}>{children}</Ctx.Provider>;
}

export function usePipeline() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePipeline fora do PipelineProvider");
  return c;
}

export function fmtDur(ms: number) {
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

// Ícones de estado no desenho do GitHub Actions: na fila, rodando, sucesso.
export function StatusIcon({ s, size = 16 }: { s: JobStatus; size?: number }) {
  if (s === "success") {
    return (
      <svg className="sicon sicon--ok" width={size} height={size} viewBox="0 0 16 16" aria-label="concluído">
        <circle cx="8" cy="8" r="8" />
        <path d="M4.6 8.3 7 10.6l4.5-5" fill="none" strokeWidth="1.8" strokeLinecap="square" />
      </svg>
    );
  }
  if (s === "running") {
    return (
      <svg className="sicon sicon--run" width={size} height={size} viewBox="0 0 16 16" aria-label="rodando">
        <circle cx="8" cy="8" r="6.5" fill="none" strokeWidth="2" className="sicon__track" />
        <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" fill="none" strokeWidth="2" className="sicon__arc" />
      </svg>
    );
  }
  return (
    <svg className="sicon sicon--queued" width={size} height={size} viewBox="0 0 16 16" aria-label="na fila">
      <circle cx="8" cy="8" r="6.5" fill="none" strokeWidth="1.5" strokeDasharray="2.6 2.4" />
    </svg>
  );
}
