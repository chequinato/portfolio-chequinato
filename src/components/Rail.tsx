import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sections } from "@/data/sections";
import { spTime, useClock, type Mode } from "@/lib/hooks";

// Trilho fixo à esquerda: monograma, régua de seções com a posição atual,
// relógio de São Paulo e o botão de inversão. No celular vira barra no topo.
export function Rail({ mode, onToggle }: { mode: Mode; onToggle: () => void }) {
  const now = useClock();
  const { pathname } = useLocation();
  const home = pathname === "/";
  const [active, setActive] = useState("inicio");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!home) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
      const mid = window.innerHeight * 0.35;
      let cur = "inicio";
      for (const el of els) if (el.getBoundingClientRect().top <= mid) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  const current = sections.find((s) => s.id === active)!;

  return (
    <aside className="rail" aria-label="Navegação">
      <Link to="/" className="rail__mono" aria-label="Início">
        <span>M</span>
        <span>C</span>
      </Link>

      <nav className="rail__ruler" aria-label="Seções">
        <span className="rail__track" aria-hidden>
          <span className="rail__fill" style={{ transform: `scaleY(${home ? progress : 0})` }} />
        </span>
        {sections.map((s) => (
          <Link
            key={s.id}
            to={`/#${s.id}`}
            className={`rail__tick ${home && s.id === active ? "is-on" : ""}`}
            aria-current={home && s.id === active ? "true" : undefined}
          >
            <span className="rail__tick-n">{s.n}</span>
            <span className="rail__tick-label">{s.label}</span>
          </Link>
        ))}
      </nav>

      <div className="rail__mark" aria-hidden>
        CHEQUINATO — ENG. DE SOFTWARE — FOLHA {home ? current.n : "N"}
      </div>

      <div className="rail__foot">
        <span className="rail__clock" title="Horário de São Paulo">
          <span className="led" />
          <span className="mono">{spTime(now)}</span>
        </span>
        <button
          className="mode-btn"
          onClick={onToggle}
          aria-label={mode === "ink" ? "Mudar para modo papel" : "Mudar para modo tinta"}
          title={mode === "ink" ? "Modo papel" : "Modo tinta"}
        />
      </div>
    </aside>
  );
}
