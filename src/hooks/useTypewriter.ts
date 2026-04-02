import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed = 70) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setOutput(text.slice(0, i));
      i++;

      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}
