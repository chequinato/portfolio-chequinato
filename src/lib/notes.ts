import { marked } from "marked";

// Notas = arquivos .md em src/content/notas. Publicar é criar um arquivo,
// dar push, e a Vercel republica. O nome do arquivo vira o endereço:
// src/content/notas/minha-nota.md  →  /notas/minha-nota
//
// Cabeçalho aceito (entre as linhas ---):
//   title: Título da nota
//   date: 2026-10-23
//   tags: aws, terraform
//   kind: estudo | atualização | projeto
//   summary: Uma frase que aparece na lista.

export type Note = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  kind: string;
  summary: string;
  body: string;
  minutes: number;
};

const files = import.meta.glob("../content/notas/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function parse(path: string, raw: string): Note {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  const body = m ? m[2] : raw;
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    kind: meta.kind ?? "nota",
    summary: meta.summary ?? "",
    body,
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

export const notes: Note[] = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function findNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

export function renderNote(n: Note) {
  return marked.parse(n.body, { async: false }) as string;
}

export function fmtDate(iso: string, long = false) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", long ? { day: "2-digit", month: "long", year: "numeric" } : { day: "2-digit", month: "2-digit", year: "numeric" });
}
