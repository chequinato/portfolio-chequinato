// Trajetória e credenciais.

export type Milestone = {
  when: string;
  year: number;
  title: string;
  place: string;
  body: string;
  stack?: string[];
  current?: boolean;
  signal?: boolean;
  // Como o marco aparece no git log: mensagem de commit, faixa do grafo
  // (0 = main, 1 = branch paralela) e refs ao lado do hash.
  commit: string;
  lane: 0 | 1;
  refs?: string[];
};

export const timeline: Milestone[] = [
  {
    when: "2021",
    year: 2021,
    title: "Primeira linha de código",
    commit: "init: primeira linha de código",
    lane: 0,
    refs: ["root"],
    place: "Por conta própria",
    body: "Começo a estudar tecnologia sozinho: lógica, web e os primeiros projetos para entender como as coisas funcionam por dentro.",
  },
  {
    when: "2023 — 2025",
    year: 2023,
    title: "Técnico em Logística + Ensino Médio",
    commit: "feat(estudo): técnico em logística + ensino médio",
    lane: 0,
    place: "SENAI Jundiaí · SESI",
    body: "Formação técnica junto com o ensino médio. Processos, fluxo e organização — que hoje aparecem em como eu desenho sistemas.",
  },
  {
    when: "jan. 2024 — dez. 2025",
    year: 2024,
    title: "Menor Aprendiz",
    commit: "feat(carreira): menor aprendiz na vetnil",
    lane: 0,
    place: "Vetnil",
    body: "Primeira rotina corporativa: responsabilidade, prazos e trabalho em equipe.",
  },
  {
    when: "início de 2026 · 1 mês",
    year: 2026,
    title: "Assistente de TI",
    commit: "feat(carreira): assistente de ti na artfinal",
    lane: 0,
    place: "Artfinal Eventos",
    body: "Um mês, mas em produção: manutenção de sistemas internos em PHP e Laravel, consultas em MySQL e automações em Python.",
    stack: ["PHP", "MySQL", "Python", "JavaScript"],
  },
  {
    when: "fev. 2026 — agora",
    year: 2026,
    title: "Engenharia de Software",
    commit: "feat(estudo): engenharia de software na unianchieta",
    lane: 1,
    refs: ["origin/faculdade"],
    place: "UniAnchieta · 2º semestre",
    body: "Graduação em andamento. Banco de dados, Python, estruturas de dados — e os projetos da faculdade viram repositório público.",
    current: true,
  },
  {
    when: "mai. 2026 — agora",
    year: 2026,
    title: "Estagiário em Engenharia de Software",
    commit: "feat(carreira): estágio de engenharia de software no itaú",
    lane: 0,
    refs: ["HEAD → main", "tag: itau"],
    place: "Itaú Unibanco · squad híbrida",
    body: "Aprovado com uma semana de faculdade. Back-end em Python, infraestrutura com Terraform, serviços AWS e modelagem em DynamoDB, numa squad integrada às áreas de negócio.",
    stack: ["Python", "AWS", "Terraform", "SQL"],
    current: true,
    signal: true,
  },
];

export type Badge = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
  skills: string[];
  // "selo" = imagem quadrada de badge; "doc" = certificado em paisagem.
  shape: "selo" | "doc";
};

const li = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;

// Os "artifacts" da run: certificados e selos, do mais recente ao mais
// antigo. O link aponta para a verificação oficial quando existe; senão,
// para a publicação no LinkedIn.
export const badges: Badge[] = [
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Udemy",
    date: "2026-07",
    image: "/linkedin/7482558181597102080_0.jpg",
    url: li("7482558181597102080"),
    skills: ["AWS Lambda", "IAM", "EC2", "S3"],
    shape: "doc",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026-06",
    image: "/linkedin/7472418011841306624_0.jpg",
    url: "https://verify.skilljar.com/c/q5yp8vg83kx3",
    skills: ["Claude Code", "Agentes de IA"],
    shape: "doc",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026-06",
    image: "/linkedin/7472418011841306624_1.jpg",
    url: "https://verify.skilljar.com/c/xvsm8f7xvdxb",
    skills: ["IA aplicada"],
    shape: "doc",
  },
  {
    title: "Introduction to Claude Cowork",
    issuer: "Anthropic",
    date: "2026-06",
    image: "/linkedin/7472418011841306624_2.jpg",
    url: "https://verify.skilljar.com/c/amoogfffjwar",
    skills: ["Agentes de IA", "Research workflows"],
    shape: "doc",
  },
  {
    title: "Applied Skill: Azure Storage",
    issuer: "Microsoft",
    date: "2026-05",
    image: "/linkedin/7465361623810199553_0.jpg",
    url: "https://learn.microsoft.com/pt-br/users/miguelpereira-1283/credentials/cffddf835f637e16",
    skills: ["Blob Storage", "Azure Files", "Key Vault"],
    shape: "doc",
  },
  {
    title: "Modelagem de Dados",
    issuer: "Itaú Unibanco",
    date: "2026-05",
    image: "/linkedin/7463677311402459138_0.jpg",
    url: li("7463677311402459138"),
    skills: ["Modelagem relacional", "SQL", "Data Mesh"],
    shape: "selo",
  },
  {
    title: "Practitioner — D&A Foundation",
    issuer: "Itaú Unibanco",
    date: "2026-05",
    image: "/linkedin/7460410026503929857_0.jpg",
    url: li("7460410026503929857"),
    skills: ["Dados", "Analytics", "Governança"],
    shape: "selo",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "2026-05",
    image: "/linkedin/7456682576791924736_0.jpg",
    url: li("7456682576791924736"),
    skills: ["EC2", "S3", "IAM", "Well-Architected"],
    shape: "doc",
  },
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2026-04",
    image: "/badges/aws-cloud-quest.png",
    url: "https://www.credly.com/badges/5890f3c4-2f54-43ed-89e3-a75fca766c71",
    skills: ["Compute", "Networking", "Database", "Security"],
    shape: "selo",
  },
  {
    title: "Google AI Fundamentals",
    issuer: "Google",
    date: "2026-04",
    image: "/badges/google-ai.png",
    url: "https://www.credly.com/badges/9f713b30-e545-47d2-82de-713d2490c620",
    skills: ["Prompt engineering", "IA responsável"],
    shape: "selo",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco",
    date: "2026-03",
    image: "/badges/cisco-networking.png",
    url: "https://www.credly.com/badges/1eed51f1-98ee-48f1-adaf-b0611ff1d638",
    skills: ["IPv4", "Protocolos"],
    shape: "selo",
  },
  {
    title: "Introduction to Packet Tracer",
    issuer: "Cisco",
    date: "2026-03",
    image: "/badges/cisco-packet-tracer.png",
    url: "https://www.credly.com/badges/c28db95a-7c76-41c2-a3eb-52b508dcb64e",
    skills: ["Simulação de rede", "IoT"],
    shape: "selo",
  },
];
