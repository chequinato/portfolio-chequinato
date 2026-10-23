import { useEffect, useState } from "react";

// Contador mecânico: cada dígito é uma coluna 0–9 que rola até o lugar,
// com um pequeno atraso por casa decimal — como um odômetro assentando.
type Props = { value: number; run: boolean; className?: string; pad?: number; delay?: number };

export function Counter({ value, run, className = "", pad = 0, delay = 0 }: Props) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => setShown(value), delay);
    return () => clearTimeout(t);
  }, [run, value, delay]);

  const target = String(value).padStart(pad, "0");
  const digits = String(shown).padStart(target.length, "0").split("");
  const thousands = target.length > 3;

  return (
    <span className={`counter ${className}`} aria-label={String(value)}>
      {digits.map((d, i) => {
        const fromRight = digits.length - i;
        const sep = thousands && fromRight % 3 === 0 && i !== 0;
        return (
          <span key={i} className="counter__pair" aria-hidden>
            {sep && <span className="counter__sep">.</span>}
            <span className="counter__slot">
            <span className="counter__col" style={{ transform: `translateY(${-Number(d) * 10}%)`, transitionDelay: `${(digits.length - i) * 70}ms` }}>
              {"0123456789".split("").map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
