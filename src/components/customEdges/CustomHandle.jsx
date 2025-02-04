import { useState, useEffect } from "react";
import { Handle, useStore } from "@xyflow/react";

const CustomHandle = ({
  position,
  type,
  id,
  isValidConnection,
  onConnect,
  style,
}) => {
  const connectedEdges = useStore((state) => state.edges);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if the handle is part of any edge
    const connected = connectedEdges.some(
      (edge) => edge.sourceHandle === id || edge.targetHandle === id
    );
    setIsConnected(connected);
  }, [connectedEdges, id]);

  return (
    <Handle
      type={type}
      position={position}
      id={id}
      isValidConnection={isValidConnection}
      onConnect={(params) => {
        if (onConnect) {
          onConnect(params);
        }
      }}
      style={{
        ...style,
        backgroundColor: isConnected ? "#fec797" : "white",
        borderColor: "#fec797",
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    />
  );
};

export default CustomHandle;
