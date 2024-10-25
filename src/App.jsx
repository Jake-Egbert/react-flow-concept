import { FlowProvider } from "./FlowContext";
import { ReactFlowProvider } from "@xyflow/react";
import Flow from "./components/Flow";

import "./index.css";
import "./styles/custom-nodes/set-variable.css";

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <Flow />
      </FlowProvider>
    </ReactFlowProvider>
  );
};

export default App;
