
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Prevent browser from restoring scroll position on refresh/back-navigate.
// Must be set synchronously before React mounts so it fires before the
// browser's async scroll-restore kicks in.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);