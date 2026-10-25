import { Link } from "react-router-dom";

// Cabeçalho da folha: identificação à esquerda, navegação curta à direita
// e o botão do console. Não é fixo: a navegação fixa é o trilho.
export function Topbar() {
  return (
    <header className="topbar">
      <Link to="/" className="topbar__id">
        <strong>Miguel Chequinato</strong>
        <span>engenharia de software</span>
      </Link>
      <nav className="topbar__nav" aria-label="Principal">
        <Link to="/#projetos">Projetos</Link>
        <Link to="/#stack">Stack</Link>
        <Link to="/#github">GitHub</Link>
        <Link to="/#publicacoes">Publicações</Link>
        <Link to="/#contato">Contato</Link>
      </nav>
      <button className="topbar__console mono" onClick={() => window.dispatchEvent(new Event("open-console"))} aria-label="Abrir console de comandos">
        <kbd>Ctrl K</kbd>
      </button>
    </header>
  );
}
