---
title: SQL que eu queria ter aprendido antes
date: 2026-10-11
tags: sql, banco de dados, faculdade
kind: estudo
summary: CTEs, índices e constraints — três coisas que mudaram a forma como eu escrevo consultas.
---

Montei um repositório de prática de SQL que começou no `SELECT` e foi até transações. Três assuntos mudaram de verdade o jeito como eu escrevo consultas.

## CTE: dar nome ao meio do caminho

Uma subconsulta aninhada em três níveis é ilegível. A mesma lógica com `WITH` vira uma sequência de passos com nome — e cada passo pode ser testado sozinho.

```sql
WITH pedidos_mes AS (
  SELECT cliente_id, SUM(total) AS gasto
  FROM pedidos
  WHERE criado_em >= '2026-10-01'
  GROUP BY cliente_id
)
SELECT c.nome, p.gasto
FROM pedidos_mes p
JOIN clientes c ON c.id = p.cliente_id
ORDER BY p.gasto DESC;
```

## Índice não é de graça

Índice acelera leitura e cobra na escrita. A pergunta certa não é "essa coluna merece índice?", é "quais consultas eu rodo mais e por quais colunas elas filtram?".

## Constraint é regra de negócio no lugar mais seguro

`NOT NULL`, `UNIQUE`, `FOREIGN KEY`: se a regra está no banco, nenhuma aplicação esquecida consegue quebrá-la.

O material, com as aulas de T-SQL da faculdade, está no [repositório](https://github.com/chequinato/sql-queries-practice).
