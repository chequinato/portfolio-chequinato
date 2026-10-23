import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import NotesIndex from "./pages/NotesIndex";
import NotePage from "./pages/NotePage";
import NotFound from "./pages/NotFound";
import { Rail } from "./components/Rail";
import { CommandPalette } from "./components/CommandPalette";
import { Topbar } from "./components/Topbar";
import { useMode } from "./lib/hooks";

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
  const { mode, toggle } = useMode();
  return (
    <BrowserRouter>
      <ScrollReset />
      <Rail mode={mode} onToggle={toggle} />
      <CommandPalette onToggleMode={toggle} />
      <main className="sheet">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notas" element={<NotesIndex />} />
          <Route path="/notas/:slug" element={<NotePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
