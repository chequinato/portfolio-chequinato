// Publicações do LinkedIn (perfil de Miguel), copiadas em out/2026.
// A data vem do próprio ID da atividade; impressões e reações são as que o
// LinkedIn mostrava no dia. Para adicionar uma nova: copiar o ID do link da
// publicação, salvar as imagens em public/linkedin/<id>_<n>.jpg e criar a
// entrada no topo da lista.

export type Post = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  images: number;
  video?: boolean;
  impressions: number;
  reactions: number;
  comments?: number;
  tags: string[];
  project?: string;
};

export const linkedinStats = { followers: 1100, connections: "500+" };

export const posts: Post[] = [
  {
    id: "7517311414584291329",
    date: "2026-10-17",
    title: "O motor de decisão do Vero, ao vivo",
    excerpt:
      "Cada ponto é uma transação real chegando via webhook. Passa pelas regras síncronas, ganha um score de risco do ML.NET e sai decidida: bloqueada na hora ou enviada para análise em background.",
    images: 0,
    video: true,
    impressions: 344,
    reactions: 11,
    tags: ["C#", ".NET", "ML.NET", "SignalR"],
    project: "vero",
  },
  {
    id: "7502451150512857089",
    date: "2026-09-06",
    title: "Um antifraude do zero com C# e Machine Learning",
    excerpt:
      "HMAC-SHA256 com comparação em tempo constante, AES-256 para dados sensíveis, rate limiting com sliding window e Gradient Boosted Trees analisando valor, horário e velocidade das transações.",
    images: 1,
    impressions: 305,
    reactions: 11,
    tags: ["C#", "Segurança", "ML"],
    project: "vero",
  },
  {
    id: "7497439464814866432",
    date: "2026-08-23",
    title: "Contains Duplicate e Valid Anagram",
    excerpt:
      "Dois problemas comuns em entrevistas técnicas que mostram a importância de escolher a estrutura certa — Set e HashMap — em vez de força bruta.",
    images: 1,
    impressions: 826,
    reactions: 23,
    comments: 3,
    tags: ["Algoritmos", "Python"],
  },
  {
    id: "7490516237094076418",
    date: "2026-08-04",
    title: "Um repositório completo para praticar SQL",
    excerpt:
      "Do SELECT e INSERT até JOINs, índices, constraints e CTEs, com um exemplo real de WooCommerce com múltiplos LEFT JOINs e exercícios resolvidos.",
    images: 0,
    impressions: 378,
    reactions: 17,
    tags: ["SQL", "Banco de dados"],
  },
  {
    id: "7488362700545273856",
    date: "2026-07-29",
    title: "AWS na prática, de ponta a ponta",
    excerpt:
      "Uma Lambda em Python que roda todo dia, busca cotações em duas APIs, calcula variações e gera alertas. Segurança desde o início: Secrets Manager, KMS, IAM mínimo e EventBridge — tudo em Terraform.",
    images: 3,
    impressions: 340,
    reactions: 10,
    comments: 1,
    tags: ["AWS", "Terraform", "Python"],
    project: "fx",
  },
  {
    id: "7482558181597102080",
    date: "2026-07-13",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    excerpt: "Concluí o curso da certificação Cloud Practitioner, fortalecendo a base de computação em nuvem.",
    images: 1,
    impressions: 489,
    reactions: 14,
    tags: ["AWS", "Certificação"],
  },
  {
    id: "7477116454354673664",
    date: "2026-06-28",
    title: "Por que índice importa",
    excerpt:
      "Sem índice o banco folheia o livro página por página. Com um índice por (estado, cpf), ele vai direto ao grupo de SP e procura o CPF só ali — e a ordem das colunas muda tudo.",
    images: 1,
    impressions: 934,
    reactions: 12,
    tags: ["SQL", "Performance"],
  },
  {
    id: "7472418011841306624",
    date: "2026-06-15",
    title: "Claude 101, Claude Code 101 e Claude Cowork",
    excerpt: "Três cursos da Anthropic sobre IA aplicada, agentes e desenvolvimento assistido por IA.",
    images: 3,
    impressions: 308,
    reactions: 12,
    tags: ["IA", "Anthropic"],
  },
  {
    id: "7468747065272131584",
    date: "2026-06-05",
    title: "Feriado de fundamentos",
    excerpt:
      "Busca linear e binária, árvore binária, bubble e insertion sort, Two Sum, HashMap, Fibonacci e Big O — entendendo quando e por que usar cada um.",
    images: 4,
    impressions: 463,
    reactions: 14,
    tags: ["Algoritmos", "Python"],
  },
  {
    id: "7465361623810199553",
    date: "2026-05-27",
    title: "Applied Skill de Azure Storage",
    excerpt:
      "Storage Accounts, Blob e File Shares, criptografia com Key Vault e Managed Identity, lifecycle, private endpoints e replicação.",
    images: 1,
    impressions: 362,
    reactions: 9,
    comments: 2,
    tags: ["Azure", "Cloud"],
  },
  {
    id: "7463677311402459138",
    date: "2026-05-22",
    title: "Modelagem de Dados — Itaú Unibanco",
    excerpt: "Modelagem lógica relacional, SQL, Data Mesh e governança de dados.",
    images: 1,
    impressions: 253,
    reactions: 16,
    tags: ["Itaú", "Dados"],
  },
  {
    id: "7462282592541634560",
    date: "2026-05-18",
    title: "Arquitetura AWS escalável e segura",
    excerpt:
      "Route 53, CloudFront, WAF, Load Balancer, ECS Fargate, RDS Multi-AZ, ElastiCache, S3, SQS, EventBridge, Step Functions, SNS, CloudWatch e CI/CD num fluxo só.",
    images: 1,
    impressions: 3382,
    reactions: 57,
    comments: 2,
    tags: ["AWS", "Arquitetura"],
  },
  {
    id: "7460410026503929857",
    date: "2026-05-13",
    title: "Practitioner — D&A Foundation, Itaú",
    excerpt: "Trilha de fundamentos de dados e analytics: modelagem, arquitetura e governança.",
    images: 1,
    impressions: 509,
    reactions: 21,
    comments: 5,
    tags: ["Itaú", "Dados"],
  },
  {
    id: "7458924415888642048",
    date: "2026-05-09",
    title: "Modelando um sistema bancário",
    excerpt:
      "Clientes, contas, transações, cartões, faturas e empréstimos — relacionamentos 1:N, N:N, auto-relacionamento e auditoria, com DBeaver e SQLite.",
    images: 1,
    impressions: 346,
    reactions: 14,
    tags: ["SQL", "Modelagem"],
  },
  {
    id: "7456682576791924736",
    date: "2026-05-03",
    title: "AWS Cloud Practitioner Essentials",
    excerpt: "EC2, S3, IAM, redes, bancos de dados, custos e o Well-Architected Framework.",
    images: 1,
    impressions: 411,
    reactions: 12,
    comments: 4,
    tags: ["AWS", "Certificação"],
  },
  {
    id: "7454948065129553921",
    date: "2026-04-28",
    title: "AWS Cloud Quest: Cloud Practitioner",
    excerpt: "Cenários reais resolvidos com EC2, S3, RDS, DynamoDB, VPC, IAM e CloudWatch.",
    images: 1,
    impressions: 231,
    reactions: 7,
    tags: ["AWS", "Certificação"],
  },
  {
    id: "7453059099082153984",
    date: "2026-04-23",
    title: "Energy Processor, ainda em evolução",
    excerpt:
      "Upload de CSV/Excel, validação, dashboard com filtros e análise de tendência — com Python, FastAPI, Streamlit, pandas e Plotly.",
    images: 5,
    impressions: 216,
    reactions: 2,
    tags: ["Python", "FastAPI"],
    project: "energy",
  },
  {
    id: "7451002944419753984",
    date: "2026-04-17",
    title: "EnergyHub: interface nova e Terraform",
    excerpt: "Dashboard, gestão de consumos, clientes e contratos — e o começo da infraestrutura como código.",
    images: 9,
    impressions: 234,
    reactions: 3,
    tags: ["Angular", ".NET", "Terraform"],
    project: "energyhub",
  },
  {
    id: "7449552719247417344",
    date: "2026-04-13",
    title: "Preparando o início no Itaú",
    excerpt: "EnergyHub simula o mercado livre de energia: clientes, contratos e simulação de economia, em .NET 8 e Angular.",
    images: 5,
    impressions: 566,
    reactions: 13,
    comments: 2,
    tags: [".NET", "Angular", "MySQL"],
    project: "energyhub",
  },
  {
    id: "7445593635452170240",
    date: "2026-04-02",
    title: "Case técnico — estágio de software Itaú",
    excerpt:
      "Um backoffice de pagamentos: compras de ações, pagamentos pendentes, executados e cancelados, e o resumo da carteira com preço médio.",
    images: 6,
    impressions: 330,
    reactions: 8,
    comments: 2,
    tags: ["Node.js", "React", "Prisma"],
    project: "backoffice",
  },
];

export const postUrl = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;
export const postImage = (id: string, n = 0) => `/linkedin/${id}_${n}.jpg`;
export const totalImpressions = posts.reduce((a, p) => a + p.impressions, 0);
