import { memo, useEffect, useState, useRef } from "react";
import { Handle, useUpdateNodeInternals } from "@xyflow/react";
import { useDnD } from "../../DnDContext";

function SetVariableNode({ id }) {
  const [localHandles, setLocalHandles] = useState([]);
  const [type, setType, contextHandles, setHandles] = useDnD();
  const updateNodeInternals = useUpdateNodeInternals();

  const initialContextHandles = useRef(contextHandles);

  useEffect(() => {
    const initialHandles = [];
    let handleId = 0;

    if (initialContextHandles.current.top)
      initialHandles.push({
        id: `top-${handleId++}`,
        position: "top",
        type: "target",
      });
    if (initialContextHandles.current.left)
      initialHandles.push({
        id: `left-${handleId++}`,
        position: "left",
        type: "target",
      });
    if (initialContextHandles.current.right)
      initialHandles.push({
        id: `right-${handleId++}`,
        position: "right",
        type: "source",
      });
    if (initialContextHandles.current.bottom)
      initialHandles.push({
        id: `bottom-${handleId++}`,
        position: "bottom",
        type: "source",
      });

    setLocalHandles(initialHandles);
  }, [initialContextHandles]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [updateNodeInternals, localHandles]);

  return (
    <div className="text-updater-node">
      {localHandles.map(
        (handle) => (
          console.log(handle),
          (
            <Handle
              key={handle.id}
              type={handle.type}
              position={handle.position}
            />
          )
        )
      )}
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
