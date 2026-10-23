import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/system.css";
import "./styles/app.css";
import "./styles/instruments.css";

createRoot(document.getElementById("root")!).render(<App />);
