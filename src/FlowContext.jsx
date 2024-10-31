import { createContext, useContext, useState } from "react";
import { useNodesState } from "@xyflow/react";
const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [contextHandles, setContextHandles] = useState({
    left: false,
    top: true,
    right: false,
    bottom: false,
  });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const values = {
    type,
    setType,
    contextHandles,
    setContextHandles,
    nodes,
    setNodes,
    onNodesChange,
  };

  return <FlowContext.Provider value={values}>{children}</FlowContext.Provider>;
};

export const useFlow = () => {
  return useContext(FlowContext);
};
