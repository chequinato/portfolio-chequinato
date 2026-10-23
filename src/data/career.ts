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
};

export const timeline: Milestone[] = [
  {
    when: "2021",
    year: 2021,
    title: "Primeira linha de código",
    place: "Por conta própria",
    body: "Começo a estudar tecnologia sozinho: lógica, web e os primeiros projetos para entender como as coisas funcionam por dentro.",
  },
  {
    when: "2023 — 2025",
    year: 2023,
    title: "Técnico em Logística + Ensino Médio",
    place: "SENAI Jundiaí · SESI",
    body: "Formação técnica junto com o ensino médio. Processos, fluxo e organização — que hoje aparecem em como eu desenho sistemas.",
  },
  {
    when: "2024 — 2025",
    year: 2024,
    title: "Menor Aprendiz",
    place: "Vetnil",
    body: "Primeira rotina corporativa: responsabilidade, prazos e trabalho em equipe.",
  },
  {
    when: "2025",
    year: 2025,
    title: "Desenvolvedor",
    place: "Artfinal Formaturas",
    body: "Passagem curta, mas em produção: manutenção e funcionalidades em sistema web com PHP e MySQL, e um pouco de JavaScript no front.",
    stack: ["PHP", "MySQL", "JavaScript"],
  },
  {
    when: "2026",
    year: 2026,
    title: "Engenharia de Software",
    place: "UniAnchieta · 2º semestre",
    body: "Graduação em andamento. Banco de dados, Python, estruturas de dados — e os projetos da faculdade viram repositório público.",
    current: true,
  },
  {
    when: "2026 — agora",
    year: 2026,
    title: "Estagiário em Engenharia de Software",
    place: "Itaú Unibanco",
    body: "Aprovado com uma semana de faculdade. No dia a dia: cloud na AWS, infraestrutura com Terraform, Python e SQL.",
    stack: ["AWS", "Terraform", "Python", "SQL"],
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
};

// Badges verificáveis no Credly (perfil público).
export const badges: Badge[] = [
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2026-04",
    image: "/badges/aws-cloud-quest.png",
    url: "https://www.credly.com/badges/5890f3c4-2f54-43ed-89e3-a75fca766c71",
    skills: ["Compute", "Networking", "Database", "Security"],
  },
  {
    title: "Google AI Fundamentals",
    issuer: "Google · Coursera",
    date: "2026-04",
    image: "/badges/google-ai.png",
    url: "https://www.credly.com/badges/9f713b30-e545-47d2-82de-713d2490c620",
    skills: ["Prompt engineering", "IA responsável", "Multimodal"],
  },
  {
    title: "Networking Basics",
    issuer: "Cisco",
    date: "2026-03",
    image: "/badges/cisco-networking.png",
    url: "https://www.credly.com/badges/1eed51f1-98ee-48f1-adaf-b0611ff1d638",
    skills: ["IPv4", "Protocolos", "Meios de rede"],
  },
  {
    title: "Introduction to Packet Tracer",
    issuer: "Cisco",
    date: "2026-03",
    image: "/badges/cisco-packet-tracer.png",
    url: "https://www.credly.com/badges/c28db95a-7c76-41c2-a3eb-52b508dcb64e",
    skills: ["Simulação de rede", "IoT"],
  },
];

export type Course = { title: string; issuer: "Itaú" | "Udemy" | "Alura" | "Outro"; year?: number; url?: string };

// Cursos fora do Credly (trilhas do Itaú, Udemy...). Preencher a partir do
// LinkedIn: título exatamente como está no certificado.
export const courses: Course[] = [];
