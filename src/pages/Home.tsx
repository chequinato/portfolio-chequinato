import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Certificates } from "@/components/Certificates";
import { NotesPreview } from "@/components/NotesPreview";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Certificates />
      <NotesPreview />
      <Contact />
    </>
  );
}
