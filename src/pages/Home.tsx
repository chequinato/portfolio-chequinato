import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Now } from "@/components/Now";
import { Projects } from "@/components/Projects";
import { Archive } from "@/components/Archive";
import { StackMatrix } from "@/components/StackMatrix";
import { GithubBand } from "@/components/GithubBand";
import { Timeline } from "@/components/Timeline";
import { Publications } from "@/components/Publications";
import { Credentials } from "@/components/Credentials";
import { NotesPreview } from "@/components/NotesPreview";
import { Contact } from "@/components/Contact";

// Ordem dos jobs da run (ver data/sections.ts): cada seção é um job.
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Now />
      <Projects />
      <Archive />
      <StackMatrix />
      <GithubBand />
      <Publications />
      <Timeline />
      <Credentials />
      <NotesPreview />
      <Contact />
    </>
  );
}
