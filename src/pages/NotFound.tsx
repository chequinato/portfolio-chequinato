import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="sec nf is-in">
      <div className="sec-head">
        <span className="idx">404</span>
        <span className="mono-label">Folha não encontrada</span>
        <span className="sec-head__rule" />
      </div>
      <h1 className="display">
        Essa página <br />
        <em>não existe.</em>
      </h1>
      <p className="serif-note">O endereço pode ter mudado. A folha principal continua no mesmo lugar.</p>
      <Link className="btn btn--solid" to="/">
        Voltar ao início
      </Link>
    </section>
  );
}
