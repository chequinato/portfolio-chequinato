import type { MouseEvent } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Dock } from "@/components/Dock";
import { Skills } from "@/components/Skills";
import { LinkedIn } from "@/components/LinkedIn";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { RunTrack } from "@/components/RunTrack";
import { KineticBand } from "@/components/KineticBand";

// Depois do hero, a mesma grade de engenharia continua por trás de todas
// as seções, com a luz seguindo o cursor.
function onGridMove(e: MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
}

export default function Home() {
  return (
    <>
      <RunTrack />
      <Hero />
      <div className="gridded" onMouseMove={onGridMove}>
        <About />
        <Skills />
        <Projects />
        <KineticBand />
        <Dock />
        <Experience />
        <LinkedIn />
        <Certificates />
        <Contact />
      </div>
    </>
  );
}
