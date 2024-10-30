import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import Modal from "react-modal";

import { FlowProvider } from "./FlowContext.jsx";
import App from "./App.jsx";
import "./index.css";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ReactFlowProvider>
        <FlowProvider>
          <App />
        </FlowProvider>
      </ReactFlowProvider>
    </BrowserRouter>
  </StrictMode>
);
