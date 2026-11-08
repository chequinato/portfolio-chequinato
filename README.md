# Portfólio — Miguel Chequinato

Portfólio pessoal: [devchequinato.vercel.app](https://devchequinato.vercel.app)

Visual clean: fundo claro, uma única cor de destaque (violeta), uma fonte
(Plus Jakarta Sans), cards arredondados e bastante respiro. A home tem sete
seções: início, sobre, projetos, trajetória, certificados, notas e contato.

## Stack

React 18 · TypeScript · Vite · React Router · CSS puro (sem framework de UI)
· Simple Icons · marked (notas em Markdown). Deploy na Vercel.

## Rodar

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # checa os tipos e gera dist/
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Dados pessoais, contato, stack atual | `src/data/profile.ts` |
| Projetos (destaques e arquivo) | `src/data/projects.ts` |
| Trajetória (git log), certificados | `src/data/career.ts` |
| Links de publicações do LinkedIn | `src/data/linkedin.ts` + `public/linkedin/` |
| Ordem das seções da home | `src/pages/Home.tsx` |
| Cores, fonte, espaçamentos e layout | `src/styles/main.css` (tokens no topo) |

## Publicar uma nota

Crie um arquivo em `src/content/notas/` — o nome vira o endereço
(`minha-nota.md` → `/notas/minha-nota`):

```markdown
---
title: Título da nota
date: 2026-10-23
tags: aws, terraform
kind: estudo
summary: Uma frase que aparece na lista.
---

Texto em Markdown...
```

Dê push: a Vercel republica e a nota aparece na home e em `/notas`.
