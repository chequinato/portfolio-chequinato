# Portfólio — Miguel Chequinato

Portfólio pessoal: [devchequinato.vercel.app](https://devchequinato.vercel.app)

O portfólio é uma execução de workflow (`portfolio.yml`): cada seção é um job
(`checkout` → `setup` → `build` → `install-deps` → `carreira` → `upload-artifacts` → `deploy`).
Descendo a página, cada job passa de na fila → rodando → concluído, com o tempo real
que o visitante ficou nele. O `deploy` (contato) é um environment protegido: só
conclui quando o visitante aprova. O estado da run mora em `src/lib/pipeline.tsx`.

Visual clean com cara de ferramenta de dev:

- **Sobre** em bento grid, com um terminal no estilo do macOS que se apresenta sozinho
- **Projetos** com capas animadas (mini-interfaces em CSS) e pop-up Problema → Solução → Resultado
- **Stack** num Dock do macOS com todas as tecnologias, ampliando no hover
- **Experiência** como uma execução do GitHub Actions (`carreira.yml`), com jobs, grafo e log
- Fontes da Apple (SF Pro / SF Mono) no Mac e iPhone, com Inter e JetBrains Mono como plano B

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
| Trajetória (jobs do workflow), certificados | `src/data/career.ts` |
| Links de publicações do LinkedIn | `src/data/linkedin.ts` + `public/linkedin/` |
| Ordem das seções da home | `src/pages/Home.tsx` |
| Cores, fontes, layout e animações | `src/styles/main.css` (tokens no topo) |
| Estilo das páginas de notas | `src/styles/pages.css` |
| Capas animadas dos projetos | `src/components/ProjectMock.tsx` + `src/styles/mocks.css` |
| Tecnologias do Dock | `src/components/Dock.tsx` |

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

Dê push: a Vercel republica e a nota aparece em `/notas`.
