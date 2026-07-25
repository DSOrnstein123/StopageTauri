import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@system/plugin-manager/pluginManager.ts";
import App from "./App.tsx";
import "./index.css";
import "highlight.js/styles/github-dark.css";
import "dockview/dist/styles/dockview.css";
import "@app/workspace/dockview/dockview.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
