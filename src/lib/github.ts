import { useEffect, useState } from "react";
import snapshot from "@/data/github-snapshot.json";

export type GhEvent = { type: string; repo: string; at: string; action: string | null; ref: string | null };
export type GhData = typeof snapshot & { live: boolean; syncedAt: string };

const USER = "chequinato";

async function get(url: string) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}

// Começa com o snapshot do build (pinta na hora, sem esqueleto) e troca
// pelos dados ao vivo assim que as duas APIs respondem.
export function useGithub() {
  const [data, setData] = useState<GhData>({ ...snapshot, live: false, syncedAt: snapshot.takenAt });

  useEffect(() => {
    let alive = true;
    const year = new Date().getFullYear();
    Promise.allSettled([
      get(`https://github-contributions-api.jogruber.de/v4/${USER}?y=${year}`),
      get(`https://api.github.com/users/${USER}/events/public?per_page=30`),
      get(`https://api.github.com/users/${USER}`),
    ]).then(([cal, ev, user]) => {
      if (!alive) return;
      setData((prev) => {
        const next = { ...prev };
        let live = false;
        if (cal.status === "fulfilled") {
          next.year = year;
          next.total = cal.value.total[String(year)] ?? prev.total;
          next.days = cal.value.contributions.map((d: { date: string; count: number; level: number }) => [d.date, d.count, d.level]);
          live = true;
        }
        if (ev.status === "fulfilled") {
          next.events = ev.value.slice(0, 12).map((e: any) => ({
            type: e.type,
            repo: e.repo.name.replace(`${USER}/`, ""),
            at: e.created_at,
            action: e.payload?.action ?? null,
            ref: e.payload?.ref ?? null,
          }));
          live = true;
        }
        if (user.status === "fulfilled") {
          const u = user.value;
          next.user = {
            ...prev.user,
            followers: u.followers,
            following: u.following,
            repos: u.public_repos,
            bio: u.bio,
          };
        }
        return { ...next, live, syncedAt: live ? new Date().toISOString() : prev.syncedAt };
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  return data;
}

export function eventLabel(e: GhEvent) {
  switch (e.type) {
    case "PushEvent":
      return { verb: "push", detail: e.ref ? e.ref.replace("refs/heads/", "") : "" };
    case "PullRequestEvent":
      return { verb: `PR ${e.action === "closed" ? "fechado" : e.action === "opened" ? "aberto" : e.action ?? ""}`, detail: "" };
    case "CreateEvent":
      return { verb: "criou", detail: e.ref ?? "repositório" };
    case "WatchEvent":
      return { verb: "estrela", detail: "" };
    case "IssuesEvent":
      return { verb: "issue", detail: e.action ?? "" };
    default:
      return { verb: e.type.replace("Event", "").toLowerCase(), detail: "" };
  }
}

// Estatísticas derivadas do calendário: dias ativos e maior sequência.
export function calendarStats(days: (string | number)[][]) {
  const today = new Date().toISOString().slice(0, 10);
  let active = 0, best = 0, run = 0, current = 0, busiest = { date: "", count: 0 };
  for (const [date, count] of days as [string, number, number][]) {
    if (date > today) break;
    if (count > 0) {
      active++;
      run++;
      best = Math.max(best, run);
      if (count > busiest.count) busiest = { date, count };
    } else run = 0;
  }
  // Sequência atual: anda para trás a partir de hoje (ou ontem, se hoje ainda está zerado).
  const past = (days as [string, number, number][]).filter(([d]) => d <= today);
  let i = past.length - 1;
  if (i >= 0 && past[i][1] === 0) i--;
  while (i >= 0 && past[i][1] > 0) {
    current++;
    i--;
  }
  return { active, best, current, busiest };
}
