import { useMemo } from "react";

// Explosão de confete em CSS: cada pedaço recebe direção, giro e cor
// aleatórios e cai com gravidade. Some sozinho depois da animação.
const colors = ["#ffffff", "#c9b8ff", "#3ddc84", "#febc2e", "#ff8fab", "#8a6dff"];

export function Confetti({ count = 46 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (Math.random() * Math.PI) + Math.PI; // para cima
        const v = 160 + Math.random() * 260;
        return {
          i,
          x: Math.cos(a) * v,
          y: Math.sin(a) * v,
          r: Math.random() * 720 - 360,
          c: colors[i % colors.length],
          d: Math.random() * 0.15,
          w: 6 + Math.random() * 6,
        };
      }),
    [count],
  );

  return (
    <span className="confetti" aria-hidden>
      {bits.map((b) => (
        <i
          key={b.i}
          style={{
            ["--x" as string]: `${b.x}px`,
            ["--y" as string]: `${b.y}px`,
            ["--r" as string]: `${b.r}deg`,
            ["--c" as string]: b.c,
            ["--w" as string]: `${b.w}px`,
            animationDelay: `${b.d}s`,
          }}
        />
      ))}
    </span>
  );
}
