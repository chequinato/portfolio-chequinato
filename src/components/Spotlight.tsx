import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jobs } from "@/lib/pipeline";
import { featured } from "@/data/projects";
import { profile, links } from "@/data/profile";
import { TechIcon } from "@/lib/icons";
import { copy } from "@/lib/hooks";

// Busca rápida no estilo Spotlight do macOS: ⌘K (ou Ctrl+K) abre, digita,
// setas escolhem e Enter executa. Pula para seções, abre projetos no
// pop-up e copia o e-mail.

type Item = { id: string; group: string; label: string; hint: string; icon: string; run: () => void };

export function Spotlight() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const { pathname } = useLocation();

  const goTo = (id: string) => {
    if (pathname !== "/") nav(`/#${id}`);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const items: Item[] = useMemo(
    () => [
      ...jobs.map((j) => ({
        id: `s-${j.id}`,
        group: "Seções",
        label: j.label,
        hint: j.job,
        icon: "#",
        run: () => goTo(j.id),
      })),
      ...featured.map((p, i) => ({
        id: `p-${p.id}`,
        group: "Projetos",
        label: p.title,
        hint: p.kicker,
        icon: p.stack[0],
        run: () => {
          goTo("projetos");
          setTimeout(() => window.dispatchEvent(new CustomEvent("open-project", { detail: i })), pathname === "/" ? 450 : 900);
        },
      })),
      {
        id: "a-email",
        group: "Ações",
        label: "Copiar e-mail",
        hint: profile.email,
        icon: "@",
        run: () => copy(profile.email).then((ok) => ok && setToast("E-mail copiado ✓")),
      },
      { id: "a-gh", group: "Ações", label: "Abrir GitHub", hint: `@${profile.github}`, icon: "GitHub", run: () => window.open(links.github, "_blank") },
      { id: "a-li", group: "Ações", label: "Abrir LinkedIn", hint: "miguel-chequinato", icon: "LinkedIn", run: () => window.open(links.linkedin, "_blank") },
      { id: "a-wa", group: "Ações", label: "Chamar no WhatsApp", hint: profile.phone, icon: "WhatsApp", run: () => window.open(links.whatsapp, "_blank") },
      { id: "a-cv", group: "Ações", label: "Baixar currículo", hint: "PDF", icon: "↓", run: () => window.open(profile.cv, "_blank") },
      { id: "a-cv-en", group: "Ações", label: "Baixar currículo em inglês", hint: "PDF · EN", icon: "↓", run: () => window.open(profile.cvEn, "_blank") },
      { id: "a-notas", group: "Ações", label: "Ler as notas", hint: "/notas", icon: "✎", run: () => nav("/notas") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const list = items.filter((it) => !q || norm(`${it.label} ${it.hint} ${it.group}`).includes(norm(q)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-spotlight", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-spotlight", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (it?: Item) => {
    if (!it) return;
    setOpen(false);
    it.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((n) => Math.min(list.length - 1, n + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((n) => Math.max(0, n - 1));
    } else if (e.key === "Enter") {
      run(list[sel]);
    }
  };

  let lastGroup = "";
  return (
    <>
      {open && (
        <div className="spot-ui" role="dialog" aria-modal="true" aria-label="Busca rápida">
          <div className="spot-ui__backdrop" onClick={() => setOpen(false)} />
          <div className="spot-ui__panel">
            <div className="spot-ui__search">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Buscar seções, projetos, ações…"
                aria-label="Buscar"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="spot-ui__list">
              {list.length === 0 && <li className="spot-ui__empty">Nada encontrado para “{q}”.</li>}
              {list.map((it, n) => {
                const head = it.group !== lastGroup;
                lastGroup = it.group;
                return (
                  <li key={it.id}>
                    {head && <p className="spot-ui__group">{it.group}</p>}
                    <button
                      className={`spot-ui__item ${n === sel ? "is-sel" : ""}`}
                      onMouseEnter={() => setSel(n)}
                      onClick={() => run(it)}
                    >
                      <span className="spot-ui__icon">
                        {it.icon.length > 2 ? <TechIcon name={it.icon} size={16} title={false} /> : it.icon}
                      </span>
                      <span className="spot-ui__label">{it.label}</span>
                      <span className="spot-ui__hint">{it.hint}</span>
                      {n === sel && <span className="spot-ui__enter">↵</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="spot-ui__foot">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navegar
              </span>
              <span>
                <kbd>↵</kbd> abrir
              </span>
              <span>
                <kbd>⌘</kbd>
                <kbd>K</kbd> fechar
              </span>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="spot-toast">{toast}</div>}
    </>
  );
}
