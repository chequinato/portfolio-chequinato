---
title: Fraude não espera: decisões síncronas e assíncronas no Vero
date: 2026-10-17
tags: c#, .net, aws, arquitetura
kind: projeto
summary: Por que o Vero responde 403 para alguns pagamentos, 202 para outros — e quem decide o destino dos duvidosos depois.
---

O Vero recebe transações por webhook e precisa responder rápido. O problema é que "rápido" e "com certeza" brigam entre si. A saída foi dividir a decisão em duas velocidades.

## Síncrono: o óbvio, na hora

Regras baratas e certeiras rodam na própria requisição. Se a transação bate numa delas, a API responde **403** e acabou. Não faz sentido enfileirar um caso que já sabemos que é fraude.

## Assíncrono: o duvidoso, com calma

Quando não dá para ter certeza em milissegundos, a transação é aceita provisoriamente com **202** e vai para uma fila. Um worker consome a fila, roda as regras mais caras e o modelo de risco, e — se confirmar a anomalia — atualiza o status e dispara um alerta.

Em produção isso é SQS + Lambda + SNS. Localmente, é uma fila em memória e um alerta no console. O domínio não sabe a diferença: ele só conhece interfaces.

## Clean Architecture sem cerimônia

São seis projetos, e a seta de dependência aponta sempre para dentro, em direção ao Domain. Se um dia eu escrever `using Vero.Api` dentro do domínio, tem algo no lugar errado.

Código no [repositório](https://github.com/chequinato/vero-webhook).
