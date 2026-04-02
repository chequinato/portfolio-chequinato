import React, { useState } from "react";
import { ExternalLink, Github, Sparkles, Image, Rocket, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


const projects = [
  {
    title: "Webhook Project",
    description:
      "Backend em TypeScript que coleta e organiza webhooks de serviços externos, valida dados e gera handlers automaticamente com IA.",
    tags: ["TypeScript", "Fastify", "Prisma", "IA", "PostgreSQL", "SQLite", "Gemini", "Node.js"],
    highlight: true,
    images: [
      "/images/webhook-1.png",
      "/images/webhook-2.png",
      "/images/webhook-3.png"
    ],
  },
  {
    title: "Fintech – Organizador Financeiro com IA",
    description:
      "Aplicação full-stack para gestão financeira pessoal com dashboard, controle de transações, metas, investimentos e assistente virtual.",
    tags: ["Angular", "NestJS", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Chart.js", "NgRx", "JWT", "Full Stack"],
    highlight: true,
    images: [
      "/images/fintech-1.png",
      "/images/fintech-2.png",
      "/images/fintech-3.png"
    ],
  },
  {
    title: "SaaS Stripe Next.js – Assinatura de Ebook",
    description:
      "Plataforma SaaS em Next.js com sistema completo de assinaturas recorrentes via Stripe. Usuários autenticados acessam ebooks exclusivos, gerenciam pagamentos e assinatura pelo dashboard.",
    tags: ["Next.js", "React", "TypeScript", "Stripe", "NextAuth", "Prisma", "Turso", "SaaS"],
    highlight: true,
    images: [
      "/images/saas-1.png",
      "/images/saas-2.png",
      "/images/saas-3.png"
    ],
  },
  {
    title: "Marketplace Imobiliário – ImobiExpress",
    description:
      "Plataforma web onde usuários podem criar conta, cadastrar e gerenciar imóveis para aluguel, navegar em listagens e ver detalhes de cada imóvel, funcionando como um marketplace interativo de propriedades.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "CRUD", "Full Stack", "Responsive"],
    highlight: true,
    images: [
      "/images/imobi-1.png",
      "/images/imobi-2.png",
      "/images/imobi-3.png"
    ],
  },
  {
    title: "Tradutor de Libras – Libras Para Todos",
    description:
      "App Android que permite pesquisar sinais em Libras e assistir vídeos correspondentes gravados por alunos, facilitando o aprendizado e promovendo acessibilidade de forma prática.",
    tags: ["Java", "Kotlin", "Android", "Acessibilidade", "Mobile Development"],
    highlight: true,
    images: [
      "/images/libras-1.png",
      "/images/libras-2.png",
      "/images/libras-3.png"
    ],
  },
  {
    title: "Analisador de Dados - Python",
    description:
      "Projeto Python para análise de dados que carrega planilhas e APIs, realiza análise exploratória, gera estatísticas e visualizações interativas, além de dashboards e relatórios automatizados, facilitando insights rápidos sobre conjuntos de dados variados.",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Plotly", "Jupyter"],
    highlight: true,
    images: [
      "/images/python-1.png",
      "/images/python-2.png",
      "/images/python-3.png"
    ],
  },
  {
    title: "Sistema para Escritório Contábil",
    description:
      "Landing page moderna para escritório de contabilidade, focada em captação de clientes e geração de leads. Inclui apresentação de serviços, formulário de contato integrado ao Supabase e design responsivo para desktop e mobile.",
    tags: ["React", "TypeScript", "Vite", "Supabase", "APIs", "Automações", "Responsive"],
    highlight: true,
    images: [
      "/images/contabil-1.png",
      "/images/contabil-2.png",
      "/images/contabil-3.png"
    ],
  },
  {
    title: "Agente Educacional Inteligente",
    description:
      "Grave aulas ou conversas em salas dedicadas e transforme seus áudios em conhecimento pesquisável, com transcrição automática e respostas da IA baseadas no que você gravou.",
    tags: ["TypeScript", "Node.js", "Fastify", "PostgreSQL", "IA", "WebSockets", "Embeddings"],
    highlight: true,
    images: [
      "/images/agents-1.png",
      "/images/agents-2.png",
      "/images/agents-3.png"
    ],
  }
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    projects.map(() => 0) // começa com a primeira imagem de cada projeto
  );

  const handlePrevImage = (index: number) => {
    setCurrentImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] =
        (newIndexes[index] - 1 + projects[index].images.length) %
        projects[index].images.length;
      return newIndexes;
    });
  };

  const handleNextImage = (index: number) => {
    setCurrentImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] =
        (newIndexes[index] + 1) % projects[index].images.length;
      return newIndexes;
    });
  };

  return (
    <section id="projects" className="py-24 px-4 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-primary/10 animate-float">
        <Rocket className="h-20 w-20" />
      </div>
      <div className="absolute bottom-10 right-10 text-primary/10 animate-float delay-300">
        <Code2 className="h-24 w-24" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projetos
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Uma seleção dos meus principais projetos desenvolvidos, demonstrando habilidades em diferentes tecnologias e áreas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 group overflow-hidden ${
                project.highlight ? "ring-1 ring-primary/30" : ""
              } ${isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Carrossel de imagens */}
              <div className="relative w-full h-60 overflow-hidden rounded-sm">
                {project.images && project.images.length > 0 ? (
                  <>
                    <img
                      src={project.images[currentImageIndexes[index]]}
                      alt={`${project.title} ${currentImageIndexes[index] + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevImage(index)}
                          className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/30 p-1 rounded-full text-white hover:bg-black/50 transition"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleNextImage(index)}
                          className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/30 p-1 rounded-full text-white hover:bg-black/50 transition"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Image className="h-10 w-10 text-primary/40 mx-auto" />
                    <span className="text-xs text-muted-foreground/60">Preview em breve</span>
                  </div>
                )}

                {project.highlight && (
                  <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Destaque
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-primary/30 text-primary/80 hover:bg-primary/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in delay-500" : "opacity-0"}`}>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 border-primary/50 hover:bg-primary/10 glow-border"
            asChild
          >
            <a href="https://github.com/chequinato" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              Ver mais no GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;