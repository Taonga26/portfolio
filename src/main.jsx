import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// GitHub Pages SPA redirect handling
const redirect = sessionStorage.getItem("redirect");

if (redirect) {
    sessionStorage.removeItem("redirect");

    window.history.replaceState(
        null,
        "",
        `/portfolio${redirect}`
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename="/portfolio">
            <App />
        </BrowserRouter>
    </StrictMode>
);