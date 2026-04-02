import { Code2, Database, Cpu, Sparkles, Zap, Terminal, Braces, GitBranch } from "lucide-react";

const FloatingIcons = () => {
  const icons = [
    { Icon: Code2, className: "top-20 left-[10%] animate-float delay-100" },
    { Icon: Database, className: "top-40 right-[15%] animate-float delay-300" },
    { Icon: Cpu, className: "bottom-32 left-[5%] animate-float delay-500" },
    { Icon: Sparkles, className: "top-32 right-[8%] animate-float delay-200" },
    { Icon: Zap, className: "bottom-20 right-[20%] animate-float delay-400" },
    { Icon: Terminal, className: "top-60 left-[20%] animate-float delay-100" },
    { Icon: Braces, className: "bottom-40 right-[10%] animate-float delay-300" },
    { Icon: GitBranch, className: "top-[70%] left-[15%] animate-float delay-200" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, className }, index) => (
        <div
          key={index}
          className={`absolute text-primary/20 ${className}`}
        >
          <Icon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
