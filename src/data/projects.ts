// Projetos em dois níveis:
// - featured: os que melhor contam o que eu faço hoje. Cada um ganha um
//   "instrumento" — uma simulação viva do que o sistema faz por dentro.
// - archive: o resto do acervo, em índice denso, com capturas de tela.

export type Instrument = "vero" | "fx" | "energy" | "ponto" | "backoffice";

export type Featured = {
  id: string;
  code: string;
  title: string;
  kicker: string;
  year: number;
  repo: string;
  summary: string;
  points: string[];
  stack: string[];
  domain: string[];
  instrument: Instrument;
};

export type Archived = {
  id: string;
  title: string;
  kind: string;
  year: number;
  repo?: string;
  live?: string;
  summary: string;
  stack: string[];
  images?: string[];
};

const gh = (r: string) => `https://github.com/chequinato/${r}`;

export const featured: Featured[] = [
  {
    id: "vero",
    code: "VR-01",
    title: "Vero",
    kicker: "Detecção de fraude em tempo real",
    year: 2026,
    repo: gh("vero-webhook"),
    summary:
      "API que recebe transações financeiras por webhook e decide, no momento em que chegam, se cada uma é confiável, suspeita ou deve ser bloqueada.",
    points: [
      "Modelo híbrido: regras síncronas bloqueiam na hora (403); casos duvidosos entram como 202 e são reavaliados por um worker",
      "Score de risco com ML.NET e corte de política em 70%",
      "Clean Architecture em seis projetos — o domínio não depende de ninguém",
      "Fila SQS, alertas SNS e worker em Lambda, tudo provisionado com Terraform",
      "Webhooks assinados com HMAC, rate limiting e painel React ao vivo via SignalR",
    ],
    stack: ["C#", ".NET", "PostgreSQL", "EF Core", "ML.NET", "SignalR", "React", "TypeScript", "AWS", "SQS", "SNS", "Lambda", "Terraform", "xUnit"],
    domain: ["Back-end", "Cloud", "Dados", "Tempo real"],
    instrument: "vero",
  },
  {
    id: "fx",
    code: "FX-02",
    title: "FX Lambda",
    kicker: "Processador serverless de câmbio",
    year: 2026,
    repo: gh("serverless-python-api"),
    summary:
      "Uma Lambda que acorda todo dia às 08h UTC, busca cotações em duas APIs, calcula variações, gera alertas e arquiva o relatório no S3. Uma segunda Lambda, atrás do API Gateway, só lê.",
    points: [
      "EventBridge dispara; credenciais vêm do Secrets Manager, cifradas com KMS",
      "Análise de risco, anomalias, matriz de cross-rates e sentimento de mercado",
      "Tendência multi-dia: média móvel, sequências e volatilidade",
      "API de consulta read-only separada do fluxo de escrita",
      "Toda a infraestrutura em Terraform, com testes em pytest",
    ],
    stack: ["Python", "AWS", "Lambda", "S3", "API Gateway", "CloudWatch", "Terraform", "pytest"],
    domain: ["Cloud", "Serverless", "Dados"],
    instrument: "fx",
  },
  {
    id: "energy",
    code: "EN-03",
    title: "Energy Processor",
    kicker: "Consumo de energia: API + dashboard",
    year: 2026,
    repo: gh("energy-processor"),
    summary:
      "Recebe planilhas de consumo, valida formato e conteúdo, calcula consumo e custo e entrega tudo por uma API REST e um dashboard interativo, com relatório em PDF e insights por IA.",
    points: [
      "Upload de CSV/Excel com validação de formato, tamanho e conteúdo",
      "FastAPI + SQLAlchemy 2, com cache opcional em Redis",
      "Dashboard em Streamlit + Plotly",
      "Docker Compose e pipeline no GitHub Actions",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "Redis", "Streamlit", "Plotly", "Docker", "GitHub Actions", "OpenAI"],
    domain: ["Back-end", "Dados", "DevOps"],
    instrument: "energy",
  },
  {
    id: "internhub",
    code: "IH-04",
    title: "InternHub",
    kicker: "Banco de horas do estágio",
    year: 2026,
    repo: gh("intern-hub"),
    summary:
      "O estagiário bate o ponto e o sistema calcula sozinho se ele deve horas ou tem crédito — com as regras da Lei do Estágio aplicadas de verdade.",
    points: [
      "Em dia de prova a meta cai pela metade (Lei 11.788/2008, art. 10)",
      "Recesso proporcional de 2,5 dias por mês, pedido e aprovado no sistema",
      "Ajuste de ponto com aprovação do gestor e comprovante em PDF",
      "Crachá virtual com QR code e agenda exportável para o Google Agenda",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "React", "TypeScript"],
    domain: ["Back-end", "Full stack", "Regras de negócio"],
    instrument: "ponto",
  },
  {
    id: "backoffice",
    code: "BO-05",
    title: "Backoffice de Pagamentos",
    kicker: "Case técnico — seleção do Itaú",
    year: 2026,
    repo: gh("investment-system"),
    summary:
      "Sistema interno para registrar compras de ações e processar os pagamentos dessas compras. Foi o case técnico do processo seletivo que me levou ao estágio.",
    points: [
      "Pagamentos com ciclo PENDENTE → EXECUTADO / CANCELADO",
      "Carteira com preço médio e histórico de eventos",
      "API REST em camadas (routes, controllers, services)",
      "Front em React com autenticação JWT e rotas protegidas",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Prisma", "SQLite", "React", "JWT"],
    domain: ["Back-end", "Full stack", "Finanças"],
    instrument: "backoffice",
  },
];

export const archive: Archived[] = [
  {
    id: "webhook",
    title: "Webhook Inspector",
    kind: "Back-end + IA",
    year: 2025,
    repo: gh("webhook-project"),
    summary: "Captura webhooks de serviços externos, valida os dados e gera handlers automaticamente com IA.",
    stack: ["TypeScript", "Node.js", "Fastify", "Prisma", "PostgreSQL", "Gemini"],
    images: ["/images/webhook-1.png", "/images/webhook-2.png", "/images/webhook-3.png"],
  },
  {
    id: "fintech",
    title: "Fintech Pessoal",
    kind: "Full stack",
    year: 2025,
    repo: gh("fintech"),
    summary: "Gestão financeira com dashboard, transações, metas, investimentos e assistente com IA.",
    stack: ["Angular", "NestJS", "TypeScript", "PostgreSQL", "Tailwind", "JWT"],
    images: ["/images/fintech-1.png", "/images/fintech-2.png", "/images/fintech-3.png"],
  },
  {
    id: "saas",
    title: "SaaS de Ebooks",
    kind: "Full stack",
    year: 2025,
    repo: gh("saas-stripe-nextjs"),
    summary: "Assinatura recorrente com Stripe: usuário autenticado acessa ebooks e gerencia o plano.",
    stack: ["Next.js", "React", "TypeScript", "Stripe", "Prisma"],
    images: ["/images/saas-1.png", "/images/saas-2.png", "/images/saas-3.png"],
  },
  {
    id: "agents",
    title: "Agente Educacional",
    kind: "IA + tempo real",
    year: 2025,
    repo: gh("nlw-agents"),
    summary: "Grava aulas em salas, transcreve o áudio e responde perguntas com base no que foi gravado (embeddings).",
    stack: ["TypeScript", "Node.js", "Fastify", "PostgreSQL", "Gemini"],
    images: ["/images/agents-1.png", "/images/agents-2.png", "/images/agents-3.png"],
  },
  {
    id: "imobi",
    title: "ImobiExpress",
    kind: "Marketplace",
    year: 2025,
    repo: gh("Sistema-Aluguel-de-Im-veis---imobiexpress"),
    summary: "Marketplace de aluguel: conta, cadastro e gestão de imóveis, listagens e detalhes.",
    stack: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "JWT"],
    images: ["/images/imobi-1.png", "/images/imobi-2.png", "/images/imobi-3.png"],
  },
  {
    id: "libras",
    title: "Libras Para Todos",
    kind: "Mobile · acessibilidade",
    year: 2024,
    repo: gh("LibrasReserva"),
    summary: "App Android para pesquisar sinais em Libras e assistir a vídeos gravados por alunos.",
    stack: ["Java", "Kotlin", "Android"],
    images: ["/images/libras-1.png", "/images/libras-2.png", "/images/libras-3.png"],
  },
  {
    id: "contabil",
    title: "Escritório Contábil",
    kind: "Site + leads",
    year: 2025,
    repo: gh("Site---Contabilidade-"),
    live: "https://contabilidade-websystem.vercel.app",
    summary: "Site de captação para escritório de contabilidade, com formulário integrado ao Supabase.",
    stack: ["React", "TypeScript", "Vite", "Supabase"],
    images: ["/images/contabil-1.png", "/images/contabil-2.png", "/images/contabil-3.png"],
  },
  {
    id: "dados",
    title: "Análise de Dados",
    kind: "Dados",
    year: 2025,
    repo: gh("An-lise-de-Dados-com-Python"),
    summary: "Carrega planilhas e APIs, faz análise exploratória e gera visualizações e relatórios.",
    stack: ["Python", "pandas", "Plotly", "Jupyter"],
    images: ["/images/python-1.png", "/images/python-2.png", "/images/python-3.png"],
  },
  {
    id: "restaurante",
    title: "Reserva de Restaurante",
    kind: "Web",
    year: 2025,
    repo: gh("Project-Django-Reserva-Restaurante"),
    summary: "Sistema de reservas em Django.",
    stack: ["Python", "Django"],
  },
  {
    id: "ecommerce",
    title: "API de E-commerce",
    kind: "API",
    year: 2026,
    repo: gh("Python-API-Ecommerce"),
    summary: "API de e-commerce em Python.",
    stack: ["Python"],
  },
  {
    id: "crud-php",
    title: "CRUD de Usuários",
    kind: "Web",
    year: 2026,
    repo: gh("crud-php-mysql"),
    summary: "Login, cadastro, edição e exclusão de usuários com PDO, sessões e senhas com hash.",
    stack: ["PHP", "MySQL"],
  },
  {
    id: "estoque-java",
    title: "Estoque em JavaFX",
    kind: "Desktop",
    year: 2026,
    repo: gh("sistema-estoque-java"),
    summary: "Gestão de estoque com interface JavaFX, CRUD, busca, alertas de estoque baixo e login.",
    stack: ["Java"],
  },
  {
    id: "luta-java",
    title: "Jogo de Luta",
    kind: "Jogo",
    year: 2026,
    repo: gh("jogo-de-luta-java"),
    summary: "Jogo de luta em Java, para praticar orientação a objetos.",
    stack: ["Java"],
  },
  {
    id: "sql",
    title: "SQL na prática",
    kind: "Estudo",
    year: 2026,
    repo: gh("sql-queries-practice"),
    summary: "Do SELECT às CTEs, índices, constraints e transações — mais as aulas de T-SQL da faculdade.",
    stack: ["T-SQL", "MySQL"],
  },
  {
    id: "solid",
    title: "SOLID com Python",
    kind: "Estudo",
    year: 2026,
    repo: gh("solid-with-python"),
    summary: "Os cinco princípios SOLID, um por vez, com exemplos em Python.",
    stack: ["Python"],
  },
  {
    id: "leetcode",
    title: "LeetCode + algoritmos",
    kind: "Estudo",
    year: 2026,
    repo: gh("leetcode-python"),
    summary: "Problemas resolvidos e estudo de algoritmos e estruturas de dados.",
    stack: ["Python"],
  },
];

// Todas as tecnologias que aparecem em algum projeto, para a matriz.
export function allProjects() {
  return [
    ...featured.map((p) => ({ id: p.id, title: p.title, stack: p.stack, featured: true })),
    ...archive.map((p) => ({ id: p.id, title: p.title, stack: p.stack, featured: false })),
  ];
}
