import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // This line is what was failing!
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
