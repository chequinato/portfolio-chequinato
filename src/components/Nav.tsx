import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { id: "sobre", label: "sobre" },
  { id: "projetos", label: "projetos" },
  { id: "trajetoria", label: "trajetória" },
  { id: "certificados", label: "certificados" },
];

// Barra fixa no topo: logo, links das seções e o botão de contato.
// No celular os links viram um menu que abre por cima.
export function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca o link da seção que está no meio da tela.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/notas") ? "notas" : "");
      return;
    }
    const els = [...items.map((i) => i.id), "inicio", "notas", "contato"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
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
            chequinato<span className="logo__dot">.</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Seções">
          {items.map((i) => (
            <a key={i.id} href={to(i.id)} className={active === i.id ? "is-active" : ""} onClick={() => setOpen(false)}>
              {i.label}
            </a>
          ))}
          <Link to="/notas" className={active === "notas" ? "is-active" : ""} onClick={() => setOpen(false)}>
            notas
          </Link>
          <a href={to("contato")} className="btn btn--primary nav__cta-mobile" onClick={() => setOpen(false)}>
            contato
          </a>
        </nav>

        <a href={to("contato")} className="btn btn--primary btn--sm nav__cta">
          contato
        </a>

        <button className="nav__burger" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
