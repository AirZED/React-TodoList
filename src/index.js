import React from "react";
import ReactDOM from "react-dom/client";
import TodosContextProvider from "./store/TodosContextProvider";
import { UIContextProvider } from "./store/UIContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UIContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </UIContextProvider>
  </React.StrictMode>
);
