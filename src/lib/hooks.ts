import { useEffect, useRef, useState } from "react";

// Marca o elemento com .is-in quando ele entra na tela (uma vez só).
// As classes .rv-* do sistema ficam pausadas até isso acontecer.
export function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView, cls: inView ? "is-in" : "" };
}

// Verdadeiro enquanto o elemento está visível. Os instrumentos só simulam
// quando alguém está olhando — fora da tela, param e não gastam CPU.
export function useVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Conta direto pela posição, sem IntersectionObserver: o painel fica
    // atrás de um clip-path animado e o observer não chegava a reavaliar.
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setVisible(r.height > 0 && r.bottom > vh * 0.1 && r.top < vh * 0.9);
    };
    check();
    const late = setTimeout(check, 400);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(late);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  return { ref, visible };
}

// Relógio de São Paulo, atualizado por segundo.
export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function spTime(d: Date, seconds = false) {
  return d.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    ...(seconds ? { second: "2-digit" } : {}),
  });
}

// Intervalo que respeita visibilidade: só dispara com `active` verdadeiro.
export function useTicker(cb: () => void, ms: number, active: boolean) {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => saved.current(), ms);
    return () => clearInterval(t);
  }, [ms, active]);
}

export type Mode = "paper" | "ink";

export function useMode() {
  const [mode, setMode] = useState<Mode>(
    () => (document.documentElement.dataset.mode as Mode) || "paper",
  );
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", mode === "ink" ? "#101010" : "#E8E4D9");
    try {
      localStorage.setItem("mc-mode", mode);
    } catch {
      /* modo privado: segue sem lembrar */
    }
  }, [mode]);
  return { mode, toggle: () => setMode((m) => (m === "ink" ? "paper" : "ink")) };
}

export function relTime(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "agora";
  const m = Math.floor(diff / 60);
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `há ${d} ${d === 1 ? "dia" : "dias"}`;
  const mo = Math.floor(d / 30);
  return `há ${mo} ${mo === 1 ? "mês" : "meses"}`;
}

export function copy(text: string) {
  try {
    return navigator.clipboard.writeText(text).then(() => true, () => false);
  } catch {
    return Promise.resolve(false);
  }
}
