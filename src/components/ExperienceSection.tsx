import { Building2, Calendar, Briefcase, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    company: "Projetos Pessoais",
    role: "Desenvolvimento Web & APIs",
    period: "2023 - Atual",
    description:
      "Desenvolvimento de aplicações web, integrações com APIs e automações. Foco em aprendizado prático, boas práticas e evolução contínua.",
  },
  {
    company: "Marcos Contábil",
    role: "Suporte ao Sistema Interno & Marketing Digital",
    period: "2024 - Atual",
    description:
      "Apoio na manutenção e organização do sistema interno de clientes e atuação no marketing digital com criação de conteúdos e presença online.",
  },
  {
    company: "Modelo Odonto",
    role: "Marketing Digital & Social Media",
    period: "2024",
    description:
      "Criação de postagens, apoio na estratégia digital e manutenção das redes sociais do consultório.",
  },
  {
    company: "Elite Learning",
    role: "Marketing Digital & Social Media",
    period: "2023",
    description:
      "Atuação com criação de conteúdos e suporte à presença digital da escola de idiomas.",
  },
  {
    company: "Vetnil",
    role: "Menor Aprendiz — Programa de Formação",
    period: "2024 - 2025",
    description:
      "Participação no programa de aprendizagem profissional, desenvolvendo responsabilidade, organização e rotina corporativa.",
  },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Briefcase className="h-4 w-4" />
            Carreira
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experiência Profissional
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex flex-col md:flex-row gap-4 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 z-10" />

                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"} pl-12 md:pl-0`}>
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 group">
                    <CardHeader className="pb-2">
                      <div className={`flex items-center gap-2 text-primary text-sm ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{exp.company}</CardTitle>
                      <div className={`flex items-center gap-2 text-muted-foreground ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                        <Building2 className="h-4 w-4" />
                        {exp.role}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
