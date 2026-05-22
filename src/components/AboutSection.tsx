import { Code, Briefcase, GraduationCap, Sparkles, Zap, Brain } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const cards = [
    {
      icon: Code,
      title: "Desenvolvimento Web",
      description: "Experiência prática no desenvolvimento de aplicações web, com foco em aprendizado sólido e boas práticas.",
      delay: "delay-100"
    }
    ,
    {
      icon: Brain,
      title: "APIs e Automações",
      description: "Desenvolvimento de automações e integrações entre sistemas, utilizando APIs e recursos de IA em projetos práticos.",
      delay: "delay-200"
    }
    ,
    {
      icon: GraduationCap,
      title: "Aprendizado Contínuo",
      description: "Cursando Engenharia de Software na UniAnchieta e sempre evoluindo com projetos, estudos e novas tecnologias.",
      delay: "delay-300"
    }
    ,
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            Conheça-me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre Mim
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className={`border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 group ${isVisible ? `animate-fade-in ${card.delay}` : 'opacity-0'
                  }`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in delay-400' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/50 border border-border/50">
            <Zap className="h-5 w-5 text-primary" />
            <p className="text-lg text-muted-foreground">
              Busco oportunidades de estágio em{" "}
              <span className="text-foreground font-medium">Desenvolvimento Web</span>,{" "}
              <span className="text-foreground font-medium">Back-end / APIs</span> e{" "}
              <span className="text-foreground font-medium">Automações</span>.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
