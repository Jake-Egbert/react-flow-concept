import { useState, useRef, useEffect, memo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { useFlow } from "../../FlowContext";

const BaseNode = ({ id, children }) => {
  const [localHandles, setLocalHandles] = useState([]);
  const { contextHandles } = useFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const initialContextHandles = useRef(contextHandles);

  useEffect(() => {
    const initialHandles = [];

    if (initialContextHandles.current.top)
      initialHandles.push({
        position: Position.Top,
        type: "target",
        id: "top",
      });
    if (initialContextHandles.current.left)
      initialHandles.push({
        position: Position.Left,
        type: "target",
        id: "left",
      });
    if (initialContextHandles.current.right)
      initialHandles.push({
        position: Position.Right,
        type: "source",
        id: "right",
      });
    if (initialContextHandles.current.bottom)
      initialHandles.push({
        position: Position.Bottom,
        type: "source",
        id: "bottom",
      });

    setLocalHandles(initialHandles);
  }, [initialContextHandles]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [updateNodeInternals, localHandles]);

  return (
    <div className="text-updater-node">
      {localHandles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
        />
      ))}
      {children}
    </div>
  );
};

export default memo(BaseNode);
