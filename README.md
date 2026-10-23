# Portfólio — Miguel Chequinato

Portfólio pessoal: [devchequinato.vercel.app](https://devchequinato.vercel.app)

O portfólio é uma **execução de pipeline do GitHub Actions**: cada seção é um
job (`checkout` → `setup-itau` → `build` → … → `deploy`). Conforme o visitante
desce, os jobs passam de na fila para rodando e concluído, com o tempo real
gasto em cada um, até o deploy em produção (o contato). Cada projeto em
destaque tem um **instrumento** — uma simulação ao vivo do sistema por dentro.

## Stack

React 18 · TypeScript · Vite · React Router · CSS puro (sem framework de UI)
· Simple Icons · marked (notas em Markdown). Deploy na Vercel.

## Rodar

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # tira o snapshot do GitHub e gera dist/
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Dados pessoais, contato, stack atual | `src/data/profile.ts` |
| Projetos (destaques e arquivo) | `src/data/projects.ts` |
| Trajetória (git log), certificados | `src/data/career.ts` |
| Publicações do LinkedIn | `src/data/linkedin.ts` + `public/linkedin/` |
| Jobs da pipeline (ordem, nomes, comandos) | `src/data/sections.ts` |
| Cores, tipografia, movimento | `src/styles/system.css` |
| Composição das seções | `src/styles/app.css` |
| Instrumentos ao vivo | `src/components/instruments/` |

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

## GitHub ao vivo

A seção do GitHub busca contribuições e eventos direto das APIs públicas no
navegador do visitante. Se falhar, usa `src/data/github-snapshot.json`, que o
`npm run build` atualiza a cada deploy (`npm run snapshot` atualiza na mão).

## Atalhos

`Ctrl K` ou `/` abrem o console de comandos: ir para seções, projetos,
notas, copiar e-mail, abrir WhatsApp, baixar o currículo, trocar o tema.
