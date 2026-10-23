import { StepHead } from "./StepHead";
import { useState } from "react";
import { profile, links } from "@/data/profile";
import { copy, useReveal } from "@/lib/hooks";
import { TechIcon } from "@/lib/icons";
import { StatusIcon, fmtDur, usePipeline } from "@/lib/pipeline";

export function Contact() {
  const { ref, cls } = useReveal<HTMLElement>(0.15);
  const [copied, setCopied] = useState(false);
  const p = usePipeline();

  const onCopy = async () => {
    if (await copy(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } else {
      window.location.href = links.email;
    }
  };

  const channels = [
    { k: "WhatsApp", v: profile.phone, href: links.whatsapp, icon: "WhatsApp" },
    { k: "Telefone", v: profile.phone, href: links.phone, icon: "" },
    { k: "LinkedIn", v: "miguel-chequinato", href: links.linkedin, icon: "LinkedIn" },
    { k: "GitHub", v: "@chequinato", href: links.github, icon: "GitHub" },
    { k: "Credly", v: "selos verificáveis", href: links.credly, icon: "Credly" },
    { k: "Currículo", v: "PDF · download", href: profile.cv, icon: "", download: true },
  ];

  return (
    <section id="contato" ref={ref} className={`band contact ${cls}`}>
      <div className="band__inner">
        <StepHead id="contato" right={profile.city} zone />

        <div className={`deploy ${p.done ? "is-ok" : ""}`}>
          <div className="deploy__env mono">
            <StatusIcon s={p.done ? "success" : "running"} size={14} />
            <span>production</span>
            <span className="deploy__state">{p.done ? "Active" : "Deploying…"}</span>
          </div>
          <div className="deploy__url mono">
            {p.done ? `✓ Run concluída em ${fmtDur(p.total)} · todos os jobs passaram` : "aguardando o último job…"}
          </div>
        </div>

        <h2 className="contact__title rv-cut">
          Vamos <br />
          conversar<span className="hero__dot">.</span>
        </h2>

        <button className={`contact__mail rv ${copied ? "is-done" : ""}`} onClick={onCopy} style={{ ["--i" as string]: 1 }}>
          <span className="contact__mail-addr">{profile.email}</span>
          <span className="mono-label">{copied ? "copiado para a área de transferência ✓" : "clique para copiar"}</span>
        </button>

        <ul className="contact__grid">
          {channels.map((c, i) => (
            <li key={c.k} className="rv-wipe" style={{ ["--i" as string]: 2 + i }}>
              <a href={c.href} target={c.download ? undefined : "_blank"} rel="noreferrer" download={c.download ? "Curriculo-Miguel-Chequinato.pdf" : undefined}>
                <span className="mono-label">{c.k}</span>
                <span className="contact__v">
                  {c.icon && <TechIcon name={c.icon} size={16} title={false} />}
                  {c.v}
                </span>
                <span className="contact__arrow" aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="foot mono-label">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span>feito à mão · React + Vite · Vercel</span>
          <span>
            atalho: <kbd>Ctrl</kbd> <kbd>K</kbd>
          </span>
        </footer>
      </div>
    </section>
  );
}
