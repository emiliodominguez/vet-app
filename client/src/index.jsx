import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App";
import "./styles/main.scss";
import "./shared/types";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
