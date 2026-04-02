import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const softSkills = [
  { name: "Resolução de problemas", level: 90 },
  { name: "Comunicação clara", level: 85 },
  { name: "Aprendizado rápido", level: 80 },
  { name: "Trabalho em equipe", level: 90 },
  { name: "Autonomia / Proatividade", level: 100 },
  { name: "Organização e atenção aos detalhes", level: 80 },
  { name: "Pensamento analítico", level: 85 },
];

export default function SoftSkillsSection() {
  const [animate, setAnimate] = useState(false);

  // Ativa animação quando a seção entra na tela
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("soft-skills");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // verifica ao carregar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="soft-skills" className="py-16 px-8 bg-secondary/10 rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Soft Skills</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {softSkills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span>{skill.name}</span>
              {/* Opção de estrelas */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(skill.level / 20)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Barra de progresso animada */}
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className={`h-3 bg-primary rounded-full transition-all duration-1000`}
                style={{ width: animate ? `${skill.level}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
