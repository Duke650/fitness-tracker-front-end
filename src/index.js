import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App"


const root = createRoot(document.querySelector("#root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    );
