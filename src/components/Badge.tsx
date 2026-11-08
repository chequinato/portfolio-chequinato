import { useEffect, useRef, useState, type PointerEvent } from "react";
import photo from "@/assets/profile-photo.png";
import { profile } from "@/data/profile";

// Crachá pendurado num cordão, com física de pêndulo: balança sozinho,
// pode ser agarrado e arrastado, e vira ao ser clicado (sem arrastar).
// O ângulo é integrado a cada quadro: aceleração = -mola·ângulo - atrito·velocidade.
const K = 38; // rigidez (quanto puxa de volta ao centro)
const C = 2.1; // atrito (quanto demora a parar)

export function Badge() {
  const anchor = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState(false);
  const s = useRef({ a: 0, v: 0, drag: false, moved: false, x0: 0, y0: 0, last: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let prev = performance.now();
    const t0 = prev;

    const frame = (t: number) => {
      const dt = Math.min(0.033, (t - prev) / 1000);
      prev = t;
      const st = s.current;
      if (!st.drag && !reduce) {
        // Uma brisa leve mantém o crachá vivo quando ninguém mexe.
        const breeze = Math.sin((t - t0) / 900) * 5;
        const acc = -K * st.a - C * st.v + breeze;
        st.v += acc * dt;
        st.a += st.v * dt;
      }
      const el = rig.current;
      if (el) {
        el.style.setProperty("--a", `${st.a.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${Math.max(-25, Math.min(25, st.v * 0.12)).toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Mexer o mouse pelo hero dá um empurrãozinho no crachá.
    const hero = document.getElementById("inicio");
    const nudge = (e: MouseEvent) => {
      if (!s.current.drag) s.current.v += Math.max(-6, Math.min(6, e.movementX * 0.35));
    };
    hero?.addEventListener("mousemove", nudge);
    return () => {
      cancelAnimationFrame(raf);
      hero?.removeEventListener("mousemove", nudge);
    };
  }, []);

  // Ângulo do ponteiro em relação ao ponto onde o cordão está preso.
  const angleTo = (x: number, y: number) => {
    const r = anchor.current!.getBoundingClientRect();
    const deg = (Math.atan2(r.left - x, y - r.top) * 180) / Math.PI;
    return Math.max(-70, Math.min(70, deg));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const st = s.current;
    st.drag = true;
    st.moved = false;
    st.x0 = e.clientX;
    st.y0 = e.clientY;
    st.last = performance.now();
    setTouched(true);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const st = s.current;
    if (!st.drag) return;
    if (Math.hypot(e.clientX - st.x0, e.clientY - st.y0) > 6) st.moved = true;
    if (!st.moved) return;
    const now = performance.now();
    const a = angleTo(e.clientX, e.clientY);
    st.v = ((a - st.a) / Math.max(1, now - st.last)) * 1000;
    st.a = a;
    st.last = now;
  };

  const onUp = () => {
    const st = s.current;
    if (!st.drag) return;
    st.drag = false;
    st.v = Math.max(-400, Math.min(400, st.v));
    if (!st.moved) setFlipped((f) => !f);
  };

  return (
    <div className="badge-zone">
      <div className="badge-anchor" ref={anchor}>
        <div className="badge-drop">
          <div className="badge-rig" ref={rig}>
            <div className="strap" aria-hidden>
              <span>chequinato ✦ portfolio.yml ✦ chequinato ✦ portfolio.yml ✦</span>
            </div>
            <div className="clip" aria-hidden />

            <div
              className={`badge ${flipped ? "is-flipped" : ""}`}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              role="button"
              tabIndex={0}
              aria-label="Crachá — clique para virar"
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
            >
              <div className="badge__face badge__front">
                <span className="badge__slot" aria-hidden />
                <div className="badge__brand">
                  <span className="badge__mark">mc</span>
                  <code>portfolio.yml</code>
                  <span className="badge__env">prod</span>
                </div>
                <div className="badge__photo">
                  <img src={photo} alt={`Foto de ${profile.name}`} draggable={false} />
                </div>
                <strong className="badge__name">
                  Miguel
                  <br />
                  Chequinato
                </strong>
                <span className="badge__role">Engenheiro de Software</span>
                <div className="badge__meta">
                  <span>back-end · cloud</span>
                  <span>desde {profile.since}</span>
                </div>
                <div className="badge__foot">
                  <span className="barcode" aria-hidden />
                  <code>ID 0018-{new Date().getFullYear()}</code>
                </div>
              </div>

              <div className="badge__face badge__back">
                <span className="badge__slot" aria-hidden />
                <span className="badge__big">mc</span>
                <p className="badge__access">
                  ACCESS
                  <b>ALL AREAS</b>
                </p>
                <ul className="badge__info">
                  <li>
                    <span>github</span>@{profile.github}
                  </li>
                  <li>
                    <span>e-mail</span>
                    {profile.email}
                  </li>
                  <li>
                    <span>base</span>
                    {profile.city}
                  </li>
                </ul>
                <p className="badge__flip">↻ clique para virar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={`badge-hint ${touched ? "is-gone" : ""}`} aria-hidden>
        <span>↖</span> arraste ou clique no crachá
      </p>
    </div>
  );
}
