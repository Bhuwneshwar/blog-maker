import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
//import { Provider } from "react-redux";
import { AppProvider } from "./ReduxV2";

import store from "./Redux/Store";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider >
            <App />
        </AppProvider>
    </React.StrictMode>
);
