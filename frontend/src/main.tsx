import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@shared/lib/registry/featureRegitry.ts";
import "@features/document/register.ts";
import App from "./App.tsx";
import "./index.css";
import "@shared/lib/editor/tiptap.css";
import "highlight.js/styles/github-dark.css";
import "dockview/dist/styles/dockview.css";
import "@core/layout/dockview/custom-dockview.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
