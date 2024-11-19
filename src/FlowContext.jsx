import { createContext, useContext, useState } from "react";
import { useNodesState } from "@xyflow/react";
const FlowContext = createContext();

const initialNodes = [
  {
    id: "node_1",
    type: "startNode",
    data: { label: "Start Node" },
    position: { x: 250, y: 250 },
    oneHandle: true,
  },
];

export const FlowProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [contextHandles, setContextHandles] = useState({
    left: true,
    right: true,
  });

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
