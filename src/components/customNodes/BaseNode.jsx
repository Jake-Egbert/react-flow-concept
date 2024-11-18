import { useState, useRef, useEffect, memo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { useFlow } from "../../FlowContext";

import NodeTypeSelector from "../flowHelpers/NodeTypeSelector";

const BaseNode = ({ id, children, type, oneHandle }) => {
  const [localHandles, setLocalHandles] = useState([]);
  const [lastNodeStates, setLastNodeStates] = useState({});
  const { contextHandles, nodes } = useFlow();
  let count = 0;
  const updateNodeInternals = useUpdateNodeInternals();

  const initialContextHandles = useRef(contextHandles);
  const currentNodeType = useRef(type);

  useEffect(() => {
    currentNodeType.current = type;
  }, [type]);

  useEffect(() => {
    const initialHandles = [];

    if (initialContextHandles.current.left) {
      initialHandles.push({
        position: Position.Left,
        type: "target",
        id: `${id}-left`,
      });
    }
    if (initialContextHandles.current.right) {
      initialHandles.push({
        position: Position.Right,
        type: "source",
        id: `${id}-right`,
      });
    }

    setLocalHandles(initialHandles);
  }, [initialContextHandles]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [updateNodeInternals, localHandles]);

  return (
    <div className="text-updater-node">
      <NodeTypeSelector
        nodeId={id}
        currentType={currentNodeType.current}
        availableTypes={["presentation", "other_type"]}
      />
      {oneHandle
        ? ""
        : localHandles.map((handle, index) => (
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
