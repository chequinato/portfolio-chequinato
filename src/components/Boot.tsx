import { useEffect, useState } from "react";

// Abertura: o portfólio "pega um runner" como um job do GitHub Actions.
// Dura ~1,6 s, aparece uma vez por sessão, some com clique ou tecla, e é
// pulada por quem prefere menos movimento.

const lines = [
  { t: "Requested labels: ubuntu-latest", d: 0 },
  { t: "Waiting for a runner to pick up this job…", d: 160 },
  { t: "Job is about to start running on runner: chequinato-01", d: 420 },
  { ok: "Set up job", d: 640 },
  { ok: "Checkout chequinato/portfolio", d: 820 },
  { ok: "Load profile · Itaú Unibanco · Eng. de Software", d: 1000 },
  { run: "Run portfolio", d: 1180 },
];

export function Boot() {
  const [show, setShow] = useState(() => {
    try {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      if (location.pathname !== "/" || location.hash) return false;
      return sessionStorage.getItem("mc-boot") !== "1";
    } catch {
      return false;
    }
  });
  const [leaving, setLeaving] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem("mc-boot", "1");
    } catch {
      /* sem storage: mostra de novo na próxima, sem problema */
    }
    document.documentElement.style.overflow = "hidden";
    const timers = lines.map((l, i) => setTimeout(() => setN(i + 1), l.d));
    const out = setTimeout(() => setLeaving(true), 1650);
    const end = setTimeout(() => setShow(false), 2150);
    const skip = () => {
      setLeaving(true);
      setTimeout(() => setShow(false), 380);
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(out);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={`boot ${leaving ? "is-leaving" : ""}`} aria-hidden>
      <div className="boot__box mono">
        <div className="boot__head">
          <span>portfolio.yml</span>
          <span>run #{new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, "0")}</span>
        </div>
        <ol>
          {lines.slice(0, n).map((l, i) => (
            <li key={i} className={l.ok ? "is-ok" : l.run ? "is-run" : ""}>
              <span className="boot__ic">{l.ok ? "✓" : l.run ? "◌" : "·"}</span>
              {l.t ?? l.ok ?? l.run}
            </li>
          ))}
        </ol>
        <div className="boot__bar">
          <span style={{ transform: `scaleX(${n / lines.length})` }} />
        </div>
      </div>
    </div>
  );
}
