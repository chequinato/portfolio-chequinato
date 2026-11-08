import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

// Marca o elemento com .is-in quando ele entra na tela (uma vez só).
// O CSS usa isso para um fade-up suave.
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
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
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView, cls: inView ? "is-in" : "" };
}

export function copy(text: string) {
  try {
    return navigator.clipboard.writeText(text).then(() => true, () => false);
  } catch {
    return Promise.resolve(false);
  }
}

// Conta de 0 até `to` quando `run` vira verdadeiro (easing suave).
export function useCountUp(to: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, ms]);
  return v;
}

// Atualiza a cada `ms` — usado no relógio ao vivo.
export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

// Passa a posição do mouse para o CSS (--mx, --my) em cada filho com
// .spot — é o "holofote" que segue o cursor nos cards.
export function spotlight(e: ReactMouseEvent<HTMLElement>) {
  e.currentTarget.querySelectorAll<HTMLElement>(".spot").forEach((el) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
}
