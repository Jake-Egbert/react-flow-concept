import { createContext, useContext, useState } from "react";

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [contextHandles, setContextHandles] = useState({
    left: false,
    top: true,
    right: false,
    bottom: false,
  });

  const values = {
    type,
    setType,
    contextHandles,
    setContextHandles,
  };

  return <FlowContext.Provider value={values}>{children}</FlowContext.Provider>;
};

export const useFlow = () => {
  return useContext(FlowContext);
};
