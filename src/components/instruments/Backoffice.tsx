import { useRef, useState } from "react";
import { Panel, Ticked, rand, pick, brl } from "./Panel";

// Ordens de compra entrando como PENDENTE e sendo executadas (ou canceladas)
// pelo processamento de pagamentos; a carteira recalcula o preço médio.

type Status = "PENDENTE" | "EXECUTADO" | "CANCELADO";
type Order = { id: number; ticker: string; qty: number; price: number; status: Status; age: number };

const tickers: Record<string, number> = { ITUB4: 36.4, PETR4: 38.1, VALE3: 61.7, BBDC4: 15.2, WEGE3: 52.9 };

export function Backoffice() {
  const seq = useRef(1041);
  const orders = useRef<Order[]>([]);
  const wallet = useRef<Record<string, { qty: number; cost: number }>>({ ITUB4: { qty: 200, cost: 200 * 34.9 } });
  const [, force] = useState(0);

  const tick = () => {
    const next = orders.current.map((o) => {
      if (o.status === "PENDENTE" && o.age >= 2 && Math.random() < 0.6) {
        const ok = Math.random() < 0.86;
        if (ok) {
          const w = (wallet.current[o.ticker] ??= { qty: 0, cost: 0 });
          w.qty += o.qty;
          w.cost += o.qty * o.price;
        }
        return { ...o, status: (ok ? "EXECUTADO" : "CANCELADO") as Status, age: o.age + 1 };
      }
      return { ...o, age: o.age + 1 };
    });
    if (Math.random() < 0.7) {
      const ticker = pick(Object.keys(tickers));
      next.unshift({
        id: seq.current++,
        ticker,
        qty: Math.round(rand(1, 30)) * 10,
        price: +(tickers[ticker] * (1 + rand(-0.02, 0.02))).toFixed(2),
        status: "PENDENTE",
        age: 0,
      });
    }
    orders.current = next.slice(0, 6);
    force((n) => n + 1);
  };

  const positions = Object.entries(wallet.current).sort((a, b) => b[1].cost - a[1].cost);
  const invested = positions.reduce((a, [, p]) => a + p.cost, 0);

  return (
    <Panel code="BO-05" title="compras e pagamentos" foot={<><span>JWT · rotas protegidas</span><span>prisma · sqlite</span></>}>
      {(live) => (
        <Ticked live={live} onTick={tick} ms={950}>
          <div className="bo">
            <table className="bo__orders">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ativo</th>
                  <th>qtd</th>
                  <th>preço</th>
                  <th>total</th>
                  <th>pagamento</th>
                </tr>
              </thead>
              <tbody>
                {orders.current.map((o) => (
                  <tr key={o.id} className={`is-${o.status.toLowerCase()} ${o.age === 0 ? "is-fresh" : ""}`}>
                    <td>{o.id}</td>
                    <td>{o.ticker}</td>
                    <td>{o.qty}</td>
                    <td>{brl(o.price)}</td>
                    <td>{brl(o.qty * o.price)}</td>
                    <td><span className="bo__chip">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bo__wallet">
              <div className="bo__inv">
                <span className="inst__k">total investido</span>
                <span className="inst__v">R$ {brl(invested)}</span>
              </div>
              <ul>
                {positions.slice(0, 4).map(([t, p]) => (
                  <li key={t}>
                    <span>{t}</span>
                    <span>{p.qty} un</span>
                    <span>PM {brl(p.cost / p.qty)}</span>
                    <span className="bo__share"><span style={{ transform: `scaleX(${p.cost / invested})` }} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Ticked>
      )}
    </Panel>
  );
}
