import { useEffect, useRef, useState } from "react";

// Texto que "decodifica": a cada mudança de `trigger`, os caracteres
// embaralham e vão se acertando da esquerda para a direita.
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789-_/<>#*";

export function Scramble({ text, trigger, ms = 520 }: { text: string; trigger?: unknown; ms?: number }) {
  const [out, setOut] = useState(text);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const fixed = Math.floor(k * text.length);
      setOut(
        text
          .split("")
          .map((c, i) => (i < fixed || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, text, ms]);

  return <>{out}</>;
}
