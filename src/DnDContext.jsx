import { createContext, useContext, useState } from "react";

const DnDContext = createContext([null, (_) => {}]);

export const DnDProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [contextHandles, setContextHandles] = useState({
    left: false,
    top: true,
    right: false,
    bottom: false,
  });

  return (
    <DnDContext.Provider
      value={[type, setType, contextHandles, setContextHandles]}
    >
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
