---
title: Uma Lambda que acorda às 8h: câmbio com AWS e Terraform
date: 2026-10-18
tags: aws, lambda, terraform, python
kind: projeto
summary: Como montei um processador de cotações serverless em que cada arquivo faz uma coisa só — e a infraestrutura inteira sobe com um terraform apply.
---

O FX Lambda nasceu de uma pergunta simples: dá para ter um "robô de plantão" que todo dia busca cotações de câmbio, compara com ontem, avisa quando algo mexeu demais e guarda o relatório — sem nenhum servidor ligado?

Dá. E o caminho ficou assim:

```
EventBridge (08:00 UTC) → Lambda → Secrets Manager (KMS)
                                 → API de cotações de hoje
                                 → API de cotações de ontem
                                 → processa → S3 → CloudWatch
```

## Uma linha de montagem

O princípio do projeto é separação de responsabilidades. O `lambda_function.py` é o gerente geral: não faz nada sozinho, só coordena. Quem busca credencial é o `secrets.py`; quem fala com as APIs é o `api_client.py`; quem calcula é o `processor.py`; quem guarda é o `storage.py`.

Nenhum arquivo precisa saber como o outro funciona por dentro. Isso deixou os testes triviais: para testar o cálculo de variação, eu não preciso da AWS — só de dois dicionários.

## O lado de leitura

Depois veio a segunda metade: uma Lambda separada, atrás de um API Gateway, que **só lê** o que já está no S3. Ela nunca chama as APIs externas. Escrita e leitura com permissões diferentes, cada uma com a sua role no IAM.

## O que o Terraform me ensinou

- A chave de API mora no Secrets Manager, cifrada com uma chave KMS própria — nada de segredo em variável de ambiente.
- O bucket nasce com bloqueio de acesso público e criptografia no servidor.
- Cada Lambda tem um log group com retenção definida, em vez de guardar log para sempre.

O código está no [repositório](https://github.com/chequinato/serverless-python-api).
