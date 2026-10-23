import type { ReactNode } from "react";
import { useTicker, useVisible } from "@/lib/hooks";

// Moldura comum dos instrumentos: cabeçalho com código e estado, e o corpo
// recebe `live` — verdadeiro só enquanto o painel está na tela.
type Props = {
  code: string;
  title: string;
  children: (live: boolean) => ReactNode;
  foot?: ReactNode;
};

export function Panel({ code, title, children, foot }: Props) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  return (
    <div className="inst" ref={ref}>
      <div className="inst__head">
        <span className="inst__code">{code}</span>
        <span className="inst__title">{title}</span>
        <span className="inst__state">
          <span className={`led ${visible ? "led--signal" : "led--off"}`} />
          {visible ? "ao vivo" : "pausado"}
        </span>
      </div>
      <div className="inst__body">{children(visible)}</div>
      {foot && <div className="inst__foot">{foot}</div>}
    </div>
  );
}

export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
export const brl = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Liga um intervalo dentro do render-prop do painel: só bate com `live`.
export function Ticked({ live, onTick, ms = 1100, children }: { live: boolean; onTick: () => void; ms?: number; children: ReactNode }) {
  useTicker(onTick, ms, live);
  return <>{children}</>;
}
