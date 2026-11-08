import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Dock } from "@/components/Dock";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { RunTrack } from "@/components/RunTrack";

export default function Home() {
  return (
    <>
      <RunTrack />
      <Hero />
      <About />
      <Projects />
      <Dock />
      <Experience />
      <Certificates />
      <Contact />
    </>
  );
}
