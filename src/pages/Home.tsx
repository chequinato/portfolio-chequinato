import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Now } from "@/components/Now";
import { Projects } from "@/components/Projects";
import { Archive } from "@/components/Archive";
import { StackMatrix } from "@/components/StackMatrix";
import { GithubBand } from "@/components/GithubBand";
import { Timeline } from "@/components/Timeline";
import { Credentials } from "@/components/Credentials";
import { NotesPreview } from "@/components/NotesPreview";
import { Contact } from "@/components/Contact";

// Ritmo da folha: papel · faixa · papel · faixa · papel · faixa.
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
      <Timeline />
      <Credentials />
      <NotesPreview />
      <Contact />
    </>
  );
}
