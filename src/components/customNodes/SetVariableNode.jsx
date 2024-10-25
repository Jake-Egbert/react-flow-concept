import { memo, useEffect, useState, useRef } from "react";
import { Handle, useUpdateNodeInternals, Position } from "@xyflow/react";
import { useFlow } from "../../FlowContext";

function SetVariableNode({ id }) {
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
      <label htmlFor="text">Text:</label>
      <input id="text" name="text" className="nodrag" />
      <select>
        <option value="boolean">True/False</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
      </select>
      <input type="text" />
    </div>
  );
}

export default memo(SetVariableNode);
