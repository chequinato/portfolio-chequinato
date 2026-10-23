// Foto do GitHub tirada no build (Vercel roda isto antes do vite build).
// A página sempre tenta os dados ao vivo; este arquivo é o plano B quando
// a API está fora ou o limite de 60 req/h do visitante estourou.
// Se a rede falhar aqui, o snapshot anterior fica como está.
import { writeFile } from "node:fs/promises";

const USER = "chequinato";
const OUT = new URL("../src/data/github-snapshot.json", import.meta.url);

async function get(url) {
  const r = await fetch(url, { headers: { "User-Agent": "portfolio-snapshot" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

try {
  const year = new Date().getFullYear();
  const [user, cal, events] = await Promise.all([
    get(`https://api.github.com/users/${USER}`),
    get(`https://github-contributions-api.jogruber.de/v4/${USER}?y=${year}`),
    get(`https://api.github.com/users/${USER}/events/public?per_page=30`),
  ]);
  const snapshot = {
    takenAt: new Date().toISOString(),
    year,
    user: {
      name: user.name, bio: user.bio, avatar: user.avatar_url, location: user.location,
      company: user.company, followers: user.followers, following: user.following,
      repos: user.public_repos, created: user.created_at,
    },
    total: cal.total[String(year)] ?? 0,
    days: cal.contributions.map((d) => [d.date, d.count, d.level]),
    events: events.slice(0, 12).map((e) => ({
      type: e.type, repo: e.repo.name.replace(`${USER}/`, ""), at: e.created_at,
      action: e.payload?.action ?? null, ref: e.payload?.ref ?? null,
    })),
  };
  await writeFile(OUT, JSON.stringify(snapshot));
  console.log(`github-snapshot: ${snapshot.total} contribuições em ${year}`);
} catch (err) {
  console.warn(`github-snapshot: mantendo o anterior (${err.message})`);
}
