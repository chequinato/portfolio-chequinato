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

export default function Home() {
  return (
    <>
      <RunTrack />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <KineticBand />
      <Dock />
      <Experience />
      <LinkedIn />
      <Certificates />
      <Contact />
    </>
  );
}
