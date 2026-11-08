import { useEffect, useState } from "react";
import { profile, links } from "@/data/profile";
import { featured, archive } from "@/data/projects";
import { badges } from "@/data/career";
import { TechIcon } from "@/lib/icons";
import { useReveal, useCountUp, useNow, spotlight } from "@/lib/hooks";
import { RevealTitle } from "./RevealTitle";

/* -------------------------------------------------------------------------
   Terminal que se apresenta sozinho, digitando comando por comando.
   ------------------------------------------------------------------------- */
const script = [
  { cmd: "whoami", out: `miguel chequinato · ${profile.age} anos` },
  { cmd: "cat stack.txt", out: "aws · terraform · python · sql" },
  { cmd: "ls projetos/", out: "vero  fx-lambda  energy  internhub  backoffice" },
  { cmd: "git log --oneline -1", out: "feat: estágio em engenharia de software" },
  { cmd: "echo $FOCO", out: "back-end, cloud e infraestrutura como código" },
];

// "Last login" no formato do Terminal do macOS, com a data de hoje.
const lastLogin = new Date().toLocaleString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
}).replace(/,/g, "");

function Terminal({ run }: { run: boolean }) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!run || line >= script.length) return;
    const cmd = script[line].cmd;
    const t =
      chars < cmd.length
        ? setTimeout(() => setChars((c) => c + 1), 55 + Math.random() * 60)
        : setTimeout(() => {
            setLine((l) => l + 1);
            setChars(0);
          }, 650);
    return () => clearTimeout(t);
  }, [run, line, chars]);

  const prompt = (
    <span className="term__prompt">
      miguel@macbook <i>~</i> %
    </span>
  );

  return (
    <div className="term">
      <div className="term__bar">
        <span />
        <span />
        <span />
        <em>miguel — -zsh — 80×24</em>
      </div>
      <div className="term__body">
        <p className="term__login">Last login: {lastLogin} on ttys000</p>
        {script.map((s, i) =>
          i < line ? (
            <div key={i}>
              <p>
                {prompt} {s.cmd}
              </p>
              <p className="term__out">{s.out}</p>
            </div>
          ) : i === line ? (
            <p key={i}>
              {prompt} {s.cmd.slice(0, chars)}
              <span className="term__caret" />
            </p>
          ) : null,
        )}
        {line >= script.length && (
          <p>
            {prompt} <span className="term__caret" />
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Contribuições do GitHub ao vivo (últimas ~22 semanas).
   ------------------------------------------------------------------------- */
type Day = { date: string; count: number; level: number };

function GithubTile() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${profile.github}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (!alive) return;
        const all: Day[] = d.contributions ?? [];
        // Começa num domingo para as colunas fecharem certinho.
        let start = Math.max(0, all.length - 7 * 22);
        while (start < all.length && new Date(all[start].date + "T12:00:00").getDay() !== 0) start++;
        setDays(all.slice(start));
        setTotal(d.total?.lastYear ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <a className="tile tile--gh spot" href={links.github} target="_blank" rel="noreferrer">
      <div className="tile__head">
        <span className="tile__label">
          <TechIcon name="GitHub" size={15} title={false} /> GitHub
        </span>
        <span className="tile__arrow" aria-hidden>
          ↗
        </span>
      </div>
      {days ? (
        <>
          <div className="heat" aria-label={`${total ?? ""} contribuições no último ano`}>
            {days.map((d, i) => (
              <span key={d.date} className={`l${d.level}`} style={{ ["--i" as string]: Math.floor(i / 7) }} />
            ))}
          </div>
          {total !== null && (
            <p className="tile__foot">
              <strong>{total}</strong> contribuições no último ano
            </p>
          )}
        </>
      ) : (
        <div className="gh-fallback">
          <TechIcon name="GitHub" size={40} title={false} />
          <div>
            <p className="tile__big">@{profile.github}</p>
            <p className="tile__foot">repositórios públicos e commits</p>
          </div>
        </div>
      )}
    </a>
  );
}

/* -------------------------------------------------------------------------
   Seção
   ------------------------------------------------------------------------- */
const stack = ["AWS", "Terraform", "Python", "SQL", "FastAPI", "PostgreSQL", "Docker", "TypeScript", "React", "Git"];

function Counter({ to, label, run }: { to: number; label: string; run: boolean }) {
  const v = useCountUp(to, run);
  return (
    <li>
      <strong>{v}</strong>
      <span>{label}</span>
    </li>
  );
}

export function About() {
  const { ref, cls, inView } = useReveal<HTMLElement>(0.2);
  const now = useNow(1000);
  const time = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" });
  const sec = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", second: "2-digit" }).padStart(2, "0");

  return (
    <section id="sobre" ref={ref} className={`section container ${cls}`}>
      <div className="sec-top">
        <span className="eyebrow fade">sobre mim</span>
        <RevealTitle text="Um pouco" accent="sobre mim." />
      </div>

      <div className="bento" onMouseMove={spotlight}>
        <div className="tile tile--term spot pop" style={{ ["--d" as string]: 1 }}>
          <Terminal run={inView} />
        </div>

        <div className="tile tile--work spot pop" style={{ ["--d" as string]: 2 }}>
          <span className="tile__label">hoje</span>
          <img src="/itau.svg" alt="Itaú Unibanco" className="tile__logo" />
          <p className="tile__text">
            {profile.role}
            <span>{profile.company}</span>
          </p>
        </div>

        <div className="tile tile--place spot pop" style={{ ["--d" as string]: 3 }}>
          <span className="tile__label">
            <span className="pulse" /> {profile.city}
          </span>
          <p className="clock">
            {time}
            <span>:{sec}</span>
          </p>
          <p className="tile__foot">{profile.course} · {profile.school}</p>
        </div>

        <div className="tile tile--nums spot pop" style={{ ["--d" as string]: 4 }}>
          <ul className="nums">
            <Counter to={featured.length + archive.length} label="projetos públicos" run={inView} />
            <Counter to={badges.length} label="certificados" run={inView} />
            <Counter to={new Date().getFullYear() - profile.since} label="anos programando" run={inView} />
          </ul>
        </div>

        <a href="#stack" className="tile tile--stack spot pop" style={{ ["--d" as string]: 5 }}>
          <div className="tile__head">
            <span className="tile__label">stack</span>
            <span className="tile__arrow" aria-hidden>
              ↓
            </span>
          </div>
          <p className="tile__title">50+ tecnologias nos meus projetos.</p>
          <div className="mini-marquee">
            <ul>
              {[...stack, ...stack].map((t, i) => (
                <li key={i} aria-hidden={i >= stack.length} title={t}>
                  <TechIcon name={t} size={22} title={false} />
                </li>
              ))}
            </ul>
          </div>
        </a>

        <div className="pop tile-wrap--gh" style={{ ["--d" as string]: 6 }}>
          <GithubTile />
        </div>
      </div>
    </section>
  );
}
