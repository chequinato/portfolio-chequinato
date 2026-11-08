import { useEffect, useState } from "react";
import { jobs } from "@/lib/pipeline";

// Abertura curta: a run "portfolio.yml" sobe, os jobs acendem um a um e a
// cortina sobe revelando a página. Aparece uma vez por visita e nunca para
// quem pediu menos movimento no sistema.
const KEY = "mc-intro";

function shouldShow() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(KEY)) return false;
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* sem storage: mostra mesmo assim */
  }
  return true;
}

export function Intro() {
  const [show] = useState(shouldShow);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(!show);

  useEffect(() => {
    if (!show) return;
    document.documentElement.dataset.intro = "on";
    const t1 = setTimeout(() => setLeaving(true), 1350);
    const t2 = setTimeout(() => setGone(true), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [show]);

  if (gone) return null;

  return (
    <div className={`intro ${leaving ? "is-leaving" : ""}`} aria-hidden>
      <div className="intro__box">
        <span className="intro__mark">mc</span>
        <p className="intro__title">
          <code>portfolio.yml</code> · Run #{new Date().getFullYear()}
        </p>
        <ol className="intro__jobs">
          {jobs.map((j, i) => (
            <li key={j.id} style={{ ["--i" as string]: i }} />
          ))}
        </ol>
      </div>
    </div>
  );
}
