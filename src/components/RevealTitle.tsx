// Título que entra palavra por palavra, cada uma subindo de dentro de uma
// máscara. `accent` é o trecho final pintado na cor de destaque.
export function RevealTitle({ text, accent, className = "sec-title" }: { text: string; accent?: string; className?: string }) {
  const words = [
    ...text.split(" ").map((w) => ({ w, a: false })),
    ...(accent ? accent.split(" ").map((w) => ({ w, a: true })) : []),
  ];
  return (
    <h2 className={className} aria-label={accent ? `${text} ${accent}` : text}>
      {words.map((x, i) => (
        <span key={i} className="word" aria-hidden>
          <span className={`word__in ${x.a ? "accent" : ""}`} style={{ ["--d" as string]: i }}>
            {x.w}
          </span>
        </span>
      ))}
    </h2>
  );
}
