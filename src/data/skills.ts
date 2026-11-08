// As práticas que atravessam os projetos, escritas como arquivos SKILL.md
// (o formato das skills do Claude): um cabeçalho com nome e descrição e,
// embaixo, quando uso, como aplico e onde isso aparece de verdade.

export type Skill = {
  slug: string;
  name: string;
  description: string;
  title: string;
  sections: { h: string; items: string[] }[];
};

export const skills: Skill[] = [
  {
    slug: "event-driven-architecture",
    name: "event-driven-architecture",
    description: "Sistemas que reagem a eventos em vez de esperar chamadas.",
    title: "Arquitetura orientada a eventos",
    sections: [
      {
        h: "Como eu aplico",
        items: ["Filas e tópicos para desacoplar quem produz de quem consome", "Retry com backoff, DLQ e consumidores idempotentes", "Webhooks assinados com HMAC"],
      },
      {
        h: "Onde aparece",
        items: ["Vero → SQS + SNS + worker em Lambda", "FX Lambda → EventBridge dispara todo dia", "Reembolso → RabbitMQ entre api e worker"],
      },
    ],
  },
  {
    slug: "clean-architecture",
    name: "clean-architecture",
    description: "Domínio no centro, sem depender de framework nem de banco.",
    title: "Clean Architecture",
    sections: [
      {
        h: "Como eu aplico",
        items: ["A seta de dependência sempre aponta para o domínio", "Camadas de fora implementam interfaces de dentro", "SOLID como guia, não como regra cega"],
      },
      {
        h: "Onde aparece",
        items: ["Vero → seis projetos .NET", "EnergyHub → .NET + Angular em camadas", "solid-with-python → um princípio por vez"],
      },
    ],
  },
  {
    slug: "unit-testing",
    name: "unit-testing",
    description: "Teste que roda rápido e diz exatamente o que quebrou.",
    title: "Testes unitários",
    sections: [
      {
        h: "Como eu aplico",
        items: ["Regra de negócio testada sem banco nem rede", "Um comportamento por teste, nome que explica o caso", "Testes rodando no CI a cada push"],
      },
      {
        h: "Onde aparece",
        items: ["FX Lambda → pytest", "Vero → xUnit", "Reembolso → JUnit 5 + Testcontainers (em construção)"],
      },
    ],
  },
  {
    slug: "ci-cd",
    name: "ci-cd",
    description: "Pipeline que testa antes de subir — e build reproduzível.",
    title: "CI/CD",
    sections: [
      {
        h: "Como eu aplico",
        items: ["GitHub Actions em todo push e pull request", "Jobs separados: instalar, checar, testar, publicar", "Docker Compose para subir tudo igual em qualquer máquina"],
      },
      {
        h: "Onde aparece",
        items: ["Energy Processor → GitHub Actions + Docker", "Reembolso → lint dos contratos no CI", "Este portfólio → portfolio.yml de verdade"],
      },
    ],
  },
  {
    slug: "infrastructure-as-code",
    name: "infrastructure-as-code",
    description: "Infra versionada no Git, revisada como código.",
    title: "Infraestrutura como código",
    sections: [
      {
        h: "Como eu aplico",
        items: ["terraform plan antes de qualquer apply", "IAM com o mínimo de permissão necessário", "Segredos no Secrets Manager, cifrados com KMS"],
      },
      {
        h: "Onde aparece",
        items: ["FX Lambda → toda a AWS em Terraform", "Vero → SQS, SNS e Lambda provisionados", "No estágio → Terraform no dia a dia"],
      },
    ],
  },
  {
    slug: "api-design",
    name: "api-design",
    description: "Contrato primeiro, código depois.",
    title: "Design de APIs",
    sections: [
      {
        h: "Como eu aplico",
        items: ["OpenAPI para REST e AsyncAPI para eventos", "Erros padronizados com Problem Details (RFC 9457)", "Idempotency-Key em operações que criam recurso"],
      },
      {
        h: "Onde aparece",
        items: ["Reembolso → contract-first, validado no CI", "Energy Processor e InternHub → FastAPI", "Backoffice → REST em camadas com JWT"],
      },
    ],
  },
  {
    slug: "data-modeling",
    name: "data-modeling",
    description: "Modelar o dado antes de escrever a query.",
    title: "Modelagem de dados",
    sections: [
      {
        h: "Como eu aplico",
        items: ["Modelo relacional normalizado quando faz sentido", "Chave de acesso pensada antes no DynamoDB", "CTEs e índices para query legível e rápida"],
      },
      {
        h: "Onde aparece",
        items: ["Estágio → modelagem em DynamoDB", "sql-queries-practice → do SELECT às CTEs", "Certificação de Modelagem de Dados"],
      },
    ],
  },
];
