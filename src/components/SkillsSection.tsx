import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Layout, Server, Database, Network, Cpu, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Linguagens",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "Python", "Java/Kotlin (noções)"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "APIs REST", "Django (noções)"],
  },
  {
    title: "Banco de Dados",
    icon: Database,
    skills: ["MySQL", "PostgreSQL (noções)", "MongoDB (noções)", "Supabase"],
  },
  {
    title: "Integrações & Arquitetura",
    icon: Network,
    skills: ["APIs", "Webhooks", "JWT", "Integrações com serviços de IA"],
  },
  {
    title: "Infra & DevOps",
    icon: Cpu,
    skills: ["Git", "GitHub", "Docker (noções)", "Deploy (Vercel / Railway / Render)"],
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 px-4 bg-secondary/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-primary/10 animate-spin-slow">
        <Cpu className="h-32 w-32" />
      </div>
      <div className="absolute bottom-20 left-10 text-primary/10 animate-float">
        <Code className="h-24 w-24" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            Tecnologias
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Habilidades Técnicas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className={`group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 ${
                  isVisible ? `animate-fade-in delay-${(index + 1) * 100}` : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm py-1.5 px-3 bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default border border-border/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
