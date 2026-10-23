import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sections } from "@/data/sections";
import { featured } from "@/data/projects";
import { notes } from "@/lib/notes";
import { profile, links } from "@/data/profile";
import { copy } from "@/lib/hooks";

// Console de comando: Ctrl/⌘+K ou "/" abre. Tudo do site a duas teclas.
type Cmd = { group: string; label: string; hint?: string; run: () => void };

export function CommandPalette({ onToggleMode }: { onToggleMode: () => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [flash, setFlash] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const go = (hash: string) => nav(`/#${hash}`);
  const ext = (url: string) => window.open(url, "_blank", "noopener");

  const cmds: Cmd[] = useMemo(
    () => [
      ...sections.map((s) => ({ group: "Ir para", label: s.label, hint: s.n, run: () => go(s.id) })),
      ...featured.map((p) => ({ group: "Projeto", label: p.title, hint: p.code, run: () => go(`p-${p.id}`) })),
      ...notes.map((n) => ({ group: "Nota", label: n.title, hint: n.date.slice(0, 7), run: () => nav(`/notas/${n.slug}`) })),
      {
        group: "Ação",
        label: "Copiar e-mail",
        hint: profile.email,
        run: () => {
          copy(profile.email);
          setFlash("e-mail copiado ✓");
        },
      },
      { group: "Ação", label: "Chamar no WhatsApp", hint: profile.phone, run: () => ext(links.whatsapp) },
      { group: "Ação", label: "Baixar currículo", hint: "PDF", run: () => window.open(profile.cv, "_blank") },
      { group: "Ação", label: "Alternar modo papel / tinta", hint: "tema", run: onToggleMode },
      { group: "Abrir", label: "GitHub", hint: "@chequinato", run: () => ext(links.github) },
      { group: "Abrir", label: "LinkedIn", run: () => ext(links.linkedin) },
      { group: "Abrir", label: "Credly", run: () => ext(links.credly) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const list = cmds.filter((c) => (c.group + " " + c.label + " " + (c.hint ?? "")).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea/i.test((e.target as HTMLElement)?.tagName);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-console", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-console", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setFlash("");
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  if (!open) return null;

  const run = (c: Cmd) => {
    c.run();
    if (c.label !== "Copiar e-mail") setOpen(false);
  };

  return (
    <div className="console" role="dialog" aria-modal="true" aria-label="Console de comandos" onClick={() => setOpen(false)}>
      <div className="console__box" onClick={(e) => e.stopPropagation()}>
        <div className="console__input">
          <span className="mono console__prompt">mc:~$</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ir para, projeto, nota, copiar e-mail…"
            aria-label="Comando"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(list.length - 1, s + 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              }
              if (e.key === "Enter" && list[sel]) run(list[sel]);
            }}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="console__list" role="listbox">
          {list.map((c, i) => (
            <li key={c.group + c.label} role="option" aria-selected={i === sel}>
              <button className={i === sel ? "is-on" : ""} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                <span className="mono-label">{c.group}</span>
                <span>{c.label}</span>
                <span className="mono console__hint">{c.hint}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className="console__empty mono">comando não encontrado: {q}</li>}
        </ul>
        <div className="console__foot mono-label">
          <span>↑↓ navegar · enter executar</span>
          <span className="mark">{flash}</span>
        </div>
      </div>
    </div>
  );
}
