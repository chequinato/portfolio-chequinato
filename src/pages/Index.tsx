import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SoftSkillsSection from "@/components/SoftSkillsSection";

// Force dark mode
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dev - Miguel Chequinato Pereira</title>
        <meta
          name="description"
          content="Portfólio de Miguel Chequinato Pereira - Desenvolvedor Full-Stack Jr com foco em IA, automações e aplicações web. Experiência com JavaScript, TypeScript, Python, React, Next.js e Node.js."
        />
        <meta
          name="keywords"
          content="desenvolvedor full stack, programador, react, next.js, node.js, typescript, python, IA, automações"
        />
      </Helmet>
      
      <div className="min-h-screen bg-background font-mono">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <SoftSkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
