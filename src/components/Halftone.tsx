import { useEffect, useRef, useState } from "react";

// A foto do autor. Na entrada ela aparece por um instante em retícula de
// impressão (pontos em onda diagonal) e logo se resolve na foto colorida,
// que é o estado normal. O botão "Retícula" volta ao efeito, se quiser.
type Props = { src: string; focusX?: number; focusY?: number; cell?: number };

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function Halftone({ src, focusX = 0.55, focusY = 0.4, cell = 7 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lum: Float32Array = new Float32Array(0);
    let cols = 0, rows = 0, w = 0, h = 0, step = cell;
    let pointer: { x: number; y: number } | null = null;
    let start = 0, raf = 0, img: HTMLImageElement | null = null;
    let ink = "", signal = "", dark = false;
    let intro = 0;

    const readColors = () => {
      ink = cssVar("--ink");
      signal = cssVar("--signal");
      dark = document.documentElement.dataset.mode === "ink";
    };

    const sample = () => {
      if (!img) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      step = w < 340 ? cell - 1.5 : cell;
      cols = Math.ceil(w / step);
      rows = Math.ceil(h / step);
      // Recorte "cover" centrado no rosto.
      const ar = w / h, iar = img.width / img.height;
      let sw = img.width, sh = img.height;
      if (iar > ar) sw = img.height * ar; else sh = img.width / ar;
      const sx = Math.min(img.width - sw, Math.max(0, img.width * focusX - sw / 2));
      const sy = Math.min(img.height - sh, Math.max(0, img.height * focusY - sh / 2));
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.filter = "contrast(1.25) brightness(1.05)";
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
      }
    };

    const draw = (t: number) => {
      const k = reduce ? 1 : Math.min(1, (t - start) / 1300);
      ctx.clearRect(0, 0, w, h);
      const maxR = step * 0.58;
      const R = Math.max(70, w * 0.22);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const tone = dark ? lum[y * cols + x] : 1 - lum[y * cols + x];
          let r = maxR * Math.pow(tone, 0.95);
          // Frente de onda diagonal: cada ponto abre com atraso.
          const delay = ((x / cols) * 0.55 + (y / rows) * 0.45) * 0.6;
          const e = Math.min(1, Math.max(0, (k - delay) / 0.4));
          r *= 1 - Math.pow(1 - e, 3);
          if (r < 0.35) continue;
          const cx = x * step + step / 2, cy = y * step + step / 2;
          let hot = false;
          if (pointer) {
            const d = Math.hypot(cx - pointer.x, cy - pointer.y);
            if (d < R) {
              const f = 1 - d / R;
              r = Math.min(step * 0.75, r * (1 + f * 0.7) + f * 0.8);
              hot = f > 0.25;
            }
          }
          ctx.fillStyle = hot ? signal : ink;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (k < 1) raf = requestAnimationFrame(draw);
    };

    const redraw = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      redraw();
    };
    const onLeave = () => {
      pointer = null;
      redraw();
    };

    readColors();
    const image = new Image();
    image.onload = () => {
      img = image;
      sample();
      start = performance.now();
      redraw();
      // A retícula é só a abertura: a foto assume logo em seguida.
      intro = window.setTimeout(() => setPhoto(true), reduce ? 0 : 1250);
    };
    image.src = src;

    const ro = new ResizeObserver(() => {
      if (!img) return;
      sample();
      redraw();
    });
    ro.observe(el);
    const mo = new MutationObserver(() => {
      readColors();
      redraw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    return () => {
      clearTimeout(intro);
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, [src, focusX, focusY, cell]);

  return (
    <figure className={`halftone ${photo ? "is-photo" : ""}`}>
      <div className="halftone__frame" ref={wrap}>
        <canvas ref={canvas} aria-hidden />
        <img src={src} alt="Miguel Chequinato" className="halftone__photo" style={{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }} />
        <span className="halftone__corner halftone__corner--tl" />
        <span className="halftone__corner halftone__corner--br" />
      </div>
      <figcaption className="halftone__cap">
        <span className="mono-label">Fig. 1 — Miguel Chequinato</span>
        <button className="halftone__switch mono-label" onClick={() => setPhoto((p) => !p)} aria-pressed={photo}>
          <span className={photo ? "is-on" : ""}>Foto</span>
          <span aria-hidden>/</span>
          <span className={!photo ? "is-on" : ""}>Retícula</span>
        </button>
      </figcaption>
    </figure>
  );
}
