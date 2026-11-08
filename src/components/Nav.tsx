import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "stack", label: "Stack" },
  { id: "experiencia", label: "Experiência" },
];

// Barra fixa no topo com progresso de leitura. No celular os links viram
// um menu que abre por cima.
export function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return setActive("");
    const els = ["inicio", ...items.map((i) => i.id), "contato"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const to = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__inner container">
        <Link to="/" className="logo" aria-label="Miguel Chequinato — início" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="logo__mark" aria-hidden>
            mc
          </span>
          <span className="logo__text">
            chequinato<span className="accent">.</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Seções">
          {items.map((i) => (
            <a key={i.id} href={to(i.id)} className={active === i.id ? "is-active" : ""} onClick={() => setOpen(false)}>
              {i.label}
            </a>
          ))}
          <a href={to("contato")} className="btn btn--primary nav__cta-mobile" onClick={() => setOpen(false)}>
            Contato
          </a>
        </nav>

        <a href={to("contato")} className="btn btn--primary btn--sm nav__cta">
          Contato
        </a>

        <button className="nav__burger" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
      <span className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />
    </header>
  );
}
