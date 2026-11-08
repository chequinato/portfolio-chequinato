import { useEffect, useRef } from "react";

// Cursor customizado: um ponto preso ao mouse e um anel que segue com
// atraso (lerp). Sobre links e botões o anel cresce. Só em mouse de verdade.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      const hot = !!target?.closest("a, button, [role='button'], .dock__app, .pcard__btn");
      ring.current?.classList.toggle("is-hot", hot);
      dot.current?.classList.toggle("is-hot", hot);
    };
    const onDown = () => ring.current?.classList.add("is-down");
    const onUp = () => ring.current?.classList.remove("is-down");
    const onLeave = () => {
      pos.x = lag.x = -100;
      pos.y = lag.y = -100;
    };

    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18;
      lag.y += (pos.y - lag.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${lag.x}px, ${lag.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden>
        <span />
      </div>
    </>
  );
}
