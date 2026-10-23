import {
  siAmazonwebservices, siTerraform, siPython, siPostgresql, siMysql, siSqlite, siPhp,
  siJavascript, siTypescript, siReact, siNodedotjs, siDotnet, siDocker, siFastapi, siRedis,
  siStreamlit, siPrisma, siNestjs, siAngular, siNextdotjs, siStripe, siMongodb, siExpress,
  siKotlin, siAndroid, siOpenjdk, siGithubactions, siGit, siPandas, siPlotly, siJupyter,
  siSupabase, siVite, siFastify, siSqlalchemy, siAwslambda, siAmazons3, siAmazonapigateway,
  siAmazonsqs, siGooglegemini, siOpenai, siDjango, siJsonwebtokens, siTailwindcss, siHtml5,
  siPytest, siAmazoncloudwatch, siCisco, siGoogle, siUdemy, siCoursera, siCredly, siGithub,
  siLinkedin, siWhatsapp, siVercel,
} from "simple-icons";

type Glyph = { path: string; hex: string };

// Nome canônico da tecnologia → ícone. Quando o Simple Icons não tem a
// marca (C#, SQL Server), o componente cai para um monograma em mono.
const map: Record<string, Glyph> = {
  AWS: siAmazonwebservices,
  Terraform: siTerraform,
  Python: siPython,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  SQLite: siSqlite,
  PHP: siPhp,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Node.js": siNodedotjs,
  ".NET": siDotnet,
  Docker: siDocker,
  FastAPI: siFastapi,
  Redis: siRedis,
  Streamlit: siStreamlit,
  Prisma: siPrisma,
  NestJS: siNestjs,
  Angular: siAngular,
  "Next.js": siNextdotjs,
  Stripe: siStripe,
  MongoDB: siMongodb,
  Express: siExpress,
  Kotlin: siKotlin,
  Android: siAndroid,
  Java: siOpenjdk,
  "GitHub Actions": siGithubactions,
  Git: siGit,
  pandas: siPandas,
  Plotly: siPlotly,
  Jupyter: siJupyter,
  Supabase: siSupabase,
  Vite: siVite,
  Fastify: siFastify,
  SQLAlchemy: siSqlalchemy,
  Lambda: siAwslambda,
  S3: siAmazons3,
  "API Gateway": siAmazonapigateway,
  SQS: siAmazonsqs,
  CloudWatch: siAmazoncloudwatch,
  Gemini: siGooglegemini,
  OpenAI: siOpenai,
  Django: siDjango,
  JWT: siJsonwebtokens,
  Tailwind: siTailwindcss,
  HTML: siHtml5,
  pytest: siPytest,
  Cisco: siCisco,
  Google: siGoogle,
  Udemy: siUdemy,
  Coursera: siCoursera,
  Credly: siCredly,
  GitHub: siGithub,
  LinkedIn: siLinkedin,
  WhatsApp: siWhatsapp,
  Vercel: siVercel,
};

const monogram: Record<string, string> = {
  "C#": "C#",
  SQL: "SQL",
  "SQL Server": "SQL",
  "T-SQL": "SQL",
  "EF Core": "EF",
  "ML.NET": "ML",
  SignalR: "SR",
  SNS: "SNS",
  xUnit: "xU",
};

export function hasIcon(name: string) {
  return name in map || name in monogram;
}

export function brandHex(name: string) {
  return map[name] ? `#${map[name].hex}` : undefined;
}

type Props = { name: string; size?: number; className?: string; title?: boolean };

export function TechIcon({ name, size = 18, className, title = true }: Props) {
  const g = map[name];
  if (g) {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="img"
        aria-label={name}
        style={{ ["--brand" as string]: `#${g.hex}` }}
      >
        {title && <title>{name}</title>}
        <path d={g.path} fill="currentColor" />
      </svg>
    );
  }
  const m = monogram[name] ?? name.slice(0, 2).toUpperCase();
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={name}>
      {title && <title>{name}</title>}
      <rect x="1" y="1" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontFamily="var(--mono)"
        fontWeight="700"
        fontSize={m.length > 2 ? 7.5 : 10}
        fill="currentColor"
      >
        {m}
      </text>
    </svg>
  );
}
