// Tudo o que é "fato sobre mim" mora aqui. Trocar um número ou um link
// é editar este arquivo, não caçar texto pelos componentes.

export const profile = {
  name: "Miguel Chequinato",
  fullName: "Miguel Chequinato Pereira",
  age: 18,
  city: "Jundiaí, SP",
  since: 2021,
  role: "Estagiário em Engenharia de Software",
  company: "Itaú Unibanco",
  course: "Engenharia de Software",
  school: "UniAnchieta",
  semester: "2º semestre",
  email: "mchequinato@gmail.com",
  phone: "+55 11 97437-1946",
  phoneRaw: "5511974371946",
  github: "chequinato",
  linkedin: "https://www.linkedin.com/in/miguel-chequinato-7018903a0/",
  credly: "https://www.credly.com/users/miguel-chequinato",
  cv: "/curriculo-miguel.pdf",
};

export const links = {
  github: `https://github.com/${profile.github}`,
  linkedin: profile.linkedin,
  email: `mailto:${profile.email}`,
  whatsapp: `https://wa.me/${profile.phoneRaw}`,
  phone: `tel:+${profile.phoneRaw}`,
  credly: profile.credly,
};

// O que eu faço no dia a dia hoje. Cada linha é um domínio, com o que de
// fato uso dentro dele — sem nota de 0 a 100.
export const nowStack = [
  {
    area: "Cloud",
    title: "AWS",
    items: ["Lambda", "S3", "API Gateway", "EventBridge", "SQS", "SNS", "Secrets Manager", "KMS", "CloudWatch", "IAM"],
  },
  {
    area: "Infra como código",
    title: "Terraform",
    items: ["IAM roles e policies", "criptografia com KMS", "API Gateway v2", "RDS", "variables e outputs", "plan → apply"],
  },
  {
    area: "Linguagem",
    title: "Python",
    items: ["boto3", "FastAPI", "SQLAlchemy", "pytest", "pandas", "type hints"],
  },
  {
    area: "Dados",
    title: "SQL",
    items: ["modelagem relacional", "JOINs", "CTEs", "índices", "T-SQL", "PostgreSQL"],
  },
];
