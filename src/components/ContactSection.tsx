import { Mail, Phone, Github, Linkedin, Send, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contactMethods = [
  {
    icon: Mail,
    title: "E-mail",
    value: "mchequinato@gmail.com",
    href: "mailto:mchequinato@gmail.com",
    color: "from-primary to-accent",
  },
  {
    icon: Phone,
    title: "Telefone",
    value: "(11) 97437-1946",
    href: "tel:+5511974371946",
    color: "from-accent to-primary",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "github.com/chequinato",
    href: "https://github.com/chequinato",
    color: "from-primary to-accent",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "linkedin.com/in/miguel-chequinato",
    href: "https://www.linkedin.com/in/miguel-chequinato-pereira-7018903a0/",
    color: "from-accent to-primary",
  },

];

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-24 px-4 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-500" />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <MessageCircle className="h-4 w-4" />
            Contato
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Vamos Conversar?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.title}
                className={`border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 group ${isVisible ? "animate-fade-in" : "opacity-0"
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{method.title}</h3>
                    {method.href ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{method.value}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in delay-400" : "opacity-0"}`}>
          <Button
            size="lg"
            className="gap-2 glow-border animate-pulse-glow"
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=mchequinato@gmail.com",
                "_blank"
              )
            }
          >
            <Send className="h-5 w-5" />
            Enviar Mensagem
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
