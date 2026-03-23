import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./app/components/tiptap/tiptap.css";
import "./app/components/tiptap/extensions/dnd/dnd.css";
import "./app/components/tiptap/link.css";
import "highlight.js/styles/github-dark.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
