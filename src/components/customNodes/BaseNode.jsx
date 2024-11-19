import { useState, useRef, useEffect, memo, useMemo } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { useFlow } from "../../FlowContext";

import NodeTypeSelector from "../flowHelpers/NodeTypeSelector";

const BaseNode = ({ id, children, type, oneHandle, noHandle }) => {
  const [localHandles, setLocalHandles] = useState([]);
  const { contextHandles } = useFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const initialContextHandles = useRef(contextHandles);
  let currentNodeType = useRef(type);

  const handles = useMemo(() => {
    const initialHandles = [];

    if (oneHandle) {
      initialHandles.push({
        position: Position.Right,
        type: "source",
        id: `${id}-right`,
      });
    } else if (noHandle) {
      initialHandles.push({
        position: Position.Right,
        type: "source",
        id: `${id}-right`,
      });
      initialHandles.push({
        position: Position.Left,
        type: "target",
        id: `${id}-left`,
      });
    } else {
      if (contextHandles.left) {
        initialHandles.push({
          position: Position.Left,
          type: "target",
          id: `${id}-left`,
        });
      }

      if (contextHandles.right) {
        initialHandles.push({
          position: Position.Right,
          type: "source",
          id: `${id}-right`,
        });
      }
    }

    return initialHandles;
  }, [contextHandles, oneHandle, noHandle]);

  useEffect(() => {
    setLocalHandles(handles);
  }, [handles]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [updateNodeInternals, localHandles]);

  useEffect(() => {
    currentNodeType.current = type;
  }, [type]);

  return (
    <div className="text-updater-node">
      <NodeTypeSelector
        nodeId={id}
        currentType={currentNodeType.current}
        availableTypes={[
          "presentation",
          "adjustQuantity",
          "conditional",
          "setVariable",
          "challenge",
          "group",
        ]}
      />
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
