import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "react-toastify/dist/ReactToastify.min.css";
import TaskProvider from "./contexts/TaskContext";

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
