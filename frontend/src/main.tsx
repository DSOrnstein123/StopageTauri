import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@app/init";
import "@features/document/index";
import App from "./App.tsx";
import "./index.css";
import "@features/document/tiptap/tiptap.css";
import "highlight.js/styles/github-dark.css";
import "dockview/dist/styles/dockview.css";
import "@core/layout/dockview/custom-dockview.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
