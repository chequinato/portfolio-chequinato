import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section page container nf">
      <span className="nf__code">404</span>
      <h1 className="sec-title">
        Essa página <span className="accent">não existe.</span>
      </h1>
      <p className="sec-intro">O endereço pode ter mudado — mas o início continua no mesmo lugar.</p>
      <Link className="btn btn--primary" to="/">
        voltar ao início
      </Link>
    </section>
  );
}
