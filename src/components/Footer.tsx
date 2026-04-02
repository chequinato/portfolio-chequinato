import { Github, Mail, Heart, Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Code2 className="h-5 w-5 text-primary" />
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-primary animate-pulse" />
            <span>por Miguel Chequinato</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:mchequinato@gmail.com" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://github.com/chequinato" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
