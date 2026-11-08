import { useEffect, useRef } from "react";

// Tipografia cinética: duas faixas de palavras gigantes que andam em
// sentidos opostos conforme o scroll (e um pouco sozinhas).
const top = ["back-end", "cloud", "aws", "terraform", "python", "sql", "apis", "event-driven"];
const bottom = ["checkout", "build", "test", "deploy", "success", "ship it", "on: push", "main"];

function Line({ words, outline }: { words: string[]; outline?: boolean }) {
  const all = [...words, ...words, ...words];
  return (
    <div className={`kinetic__line ${outline ? "kinetic__line--outline" : ""}`}>
      {all.map((w, i) => (
        <span key={i}>
          {w}
          <i aria-hidden>✦</i>
        </span>
      ))}
    </div>
  );
}

export function KineticBand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let drift = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const el = ref.current;
      if (el) {
        drift += (t - last) * 0.012;
        const r = el.getBoundingClientRect();
        // Só anima quando está perto da tela.
        if (r.bottom > -200 && r.top < window.innerHeight + 200) {
          const x = (window.scrollY * 0.35 + drift) % 1200;
          el.style.setProperty("--kx", `${-x}px`);
        }
      }
      last = t;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="kinetic-wrap" aria-hidden>
      <div className="kinetic" ref={ref}>
        <Line words={top} />
        <Line words={bottom} outline />
      </div>
    </div>
  );
}
