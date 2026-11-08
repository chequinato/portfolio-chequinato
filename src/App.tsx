import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import NotesIndex from "./pages/NotesIndex";
import NotePage from "./pages/NotePage";
import NotFound from "./pages/NotFound";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Contact";
import { PipelineProvider } from "./lib/pipeline";
import { Intro } from "./components/Intro";
import { Cursor } from "./components/Cursor";
import { Spotlight } from "./components/Spotlight";

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <PipelineProvider>
      <ScrollReset />
      <Intro />
      <Cursor />
      <Spotlight />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notas" element={<NotesIndex />} />
          <Route path="/notas/:slug" element={<NotePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      </PipelineProvider>
    </BrowserRouter>
  );
}
