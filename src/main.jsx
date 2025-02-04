import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactFlowProvider } from "@xyflow/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import Modal from "react-modal";

import { FlowProvider } from "./FlowContext.jsx";
import App from "./App.jsx";
import icons from "./assets/icons/icons.js";

import "./styles/main.scss";

icons();
Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactFlowProvider>
      <BrowserRouter>
        <FlowProvider>
          <App />
        </FlowProvider>
      </BrowserRouter>
    </ReactFlowProvider>
  </StrictMode>
);
