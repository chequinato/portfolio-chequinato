import { Github, Linkedin, Mail, Phone, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import profilePhoto from "@/assets/profile-photo.png";
import FloatingIcons from "./FloatingIcons";
import { useTypewriter } from "@/hooks/useTypewriter";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const name = useTypewriter("Miguel Chequinato", 100);
  const surname = useTypewriter("Pereira", 100);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-500" />

      <FloatingIcons />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Photo */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-gradient" />
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-background animate-scale-in">
            <img src={profilePhoto} alt="Miguel Chequinato Pereira" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
            <span className="text-primary-foreground text-lg">✨</span>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center lg:text-left animate-fade-in">
          <div className="space-y-2">
            <p className="text-primary text-lg tracking-wider uppercase font-medium">Olá, eu sou</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {name}
              <span className="block text-primary">
                {surname}
                <span className="inline-block ml-1 w-1 h-6 bg-primary animate-pulse"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium mt-3">Desenvolvedor em formação | Aberto a estágios de desenvolvimento</p>
          </div>

          <div className="mt-12">
            <div className="mt-12">
              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
                Desenvolvo aplicações web, APIs e automações.
                Estou em constante aprendizado e aberto a oportunidades de estágio em desenvolvimento.
              </p>
            </div>

          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
            <Button
              size="lg"
              className="gap-2 glow-border"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=mchequinato@gmail.com",
                  "_blank"
                )
              }
            >
              <Mail className="h-5 w-5" />
              Contato
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a href="https://github.com/chequinato" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a href="/curriculo-miguel.pdf" download="Curriculo-Miguel-Chequinato.pdf">
                <ChevronDown className="h-5 w-5" />
                CV
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 text-sm text-muted-foreground">
            <a href="mailto:mchequinato@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              mchequinato@gmail.com
            </a>
            <a href="tel:+5511974371946" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              (11) 97437-1946
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 animate-bounce cursor-pointer text-primary hover:text-foreground transition-colors z-10"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-10 w-10" />
      </button>
    </section>
  );
};

export default HeroSection;
