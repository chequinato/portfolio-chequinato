import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
};

// Cabeçalho padrão de seção: um rótulo pequeno, o título e uma frase curta.
export function SectionHead({ eyebrow, title, intro, center }: Props) {
  return (
    <header className={`sec-head ${center ? "sec-head--center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="sec-title">{title}</h2>
      {intro && <p className="sec-intro">{intro}</p>}
    </header>
  );
}
