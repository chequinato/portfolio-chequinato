import { GraduationCap, Calendar, Globe, Sparkles, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const education = [
  {
    institution: "UniAnchieta",
    course: "Engenharia de Software Full-Stack",
    period: "1º ano",
    status: "Cursando",
  },
  {
    institution: "SENAI Jundiaí",
    course: "Formação Técnica - Logística",
    period: "2023 - 2025",
    status: "Concluído",
  },
  {
    institution: "SESI",
    course: "Ensino Médio",
    period: "2023 - 2025",
    status: "Concluído",
  },
];

const languages = [
  { name: "Português", level: "Nativo", percentage: 100 },
  { name: "Inglês", level: "Intermediário", percentage: 60 },
];

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <BookOpen className="h-4 w-4" />
            Formação
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Educação & Idiomas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              Formação Acadêmica
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card 
                  key={edu.institution} 
                  className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{edu.institution}</CardTitle>
                    <p className="text-primary font-medium">{edu.course}</p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary/60" />
                      {edu.period}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      edu.status === "Em andamento" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {edu.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              Idiomas
            </h3>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6 space-y-6">
                {languages.map((lang, index) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-card-foreground">{lang.name}</span>
                      <span className="text-sm text-primary">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${lang.percentage}%` : '0%',
                          transitionDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
