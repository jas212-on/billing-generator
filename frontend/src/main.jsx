import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { GlobalProvider } from "./GlobalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
  <GlobalProvider>
    <App />
  </GlobalProvider>
  </BrowserRouter>
  
);
