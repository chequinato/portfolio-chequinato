import { useEffect, useState } from "react";
import { jobs, usePipeline } from "@/lib/pipeline";
import { StatusIcon } from "./StatusIcon";

// Trilho fino na lateral: os jobs da run ligados por uma linha que vai
// enchendo com o scroll. Clicar num nó leva até a seção.
export function RunTrack() {
  const run = usePipeline();
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setFill(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="track-rail" aria-label="Jobs da página">
      <span className="track-rail__line" aria-hidden>
        <span style={{ transform: `scaleY(${fill})` }} />
      </span>
      <ol>
        {jobs.map((j, i) => (
          <li key={j.id} className={run.current === i ? "is-current" : ""}>
            <a href={`#${j.id}`} aria-label={`${j.job} — ${j.label}`}>
              <StatusIcon s={run.status(j.id)} size={14} />
              <span className="track-rail__tip">
                <code>{j.job}</code>
                {run.duration(j.id) && <em>{run.duration(j.id)}</em>}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
