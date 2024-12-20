import { useState, useRef, useEffect, memo, useMemo } from "react";
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  NodeToolbar,
} from "@xyflow/react";
import { useFlow } from "../../FlowContext";
import HandleModal from "../modals/HandleModal";

import NodeTypeSelector from "../flowHelpers/NodeTypeSelector";

const BaseNode = ({ id, children, type, oneHandle, noHandle }) => {
  const [localHandles, setLocalHandles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { contextHandles } = useFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  let currentNodeType = useRef(type);

  const handleOpenModal = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleAdd = (side) => {
    if (!["right", "left"].includes(side.toLowerCase())) return;
    setLocalHandles((prevHandles) => {
      const sidePosition = side === "right" ? Position.Right : Position.Left;

      const sideHandles = prevHandles.filter(
        (h) => h.position === sidePosition
      );

      if (sideHandles.length >= 3) return prevHandles;

      const newHandle = {
        position: sidePosition,
        type: side === "right" ? "source" : "target",
        id: `${id}-${side}-${sideHandles.length + 1}`,
      };

      return [...prevHandles, newHandle];
    });
  };

  const handleRemove = (side) => {
    if (!["right", "left"].includes(side.toLowerCase())) return;

    setLocalHandles((prevHandles) => {
      const sidePosition = side === "right" ? Position.Right : Position.Left;

      const sideHandles = prevHandles.filter(
        (h) => h.position === sidePosition
      );

      if (sideHandles.length === 0) return prevHandles;

      const handleToRemove = sideHandles[sideHandles.length - 1].id;

      return prevHandles.filter((h) => h.id !== handleToRemove);
    });
  };

  const calculateYOffset = (index, totalHandles) => {
    if (totalHandles === 1) return 50;

    if (totalHandles === 2) return index === 0 ? 35 : 65;

    if (totalHandles === 3) {
      if (index === 0) return 25;
      if (index === 1) return 50;
      return 75;
    }

    return 50;
  };

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
    <>
      <div className="text-updater-node">
        <NodeToolbar position="bottom">
          <button onClick={handleOpenModal}>Handles</button>
        </NodeToolbar>

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
        {localHandles.map((handle, index, arr) => {
          const handleCount = arr.filter(
            (h) => h.position === handle.position
          ).length;

          const yOffset = calculateYOffset(
            arr.filter((h) => h.position === handle.position).indexOf(handle),
            handleCount
          );

          return (
            <Handle
              key={handle.id}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={{ top: `${yOffset}%` }}
            />
          );
        })}
        {children}
      </div>
      {isEditing && (
        <HandleModal
          isOpen={isEditing}
          onRequestClose={handleCloseModal}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          key={id}
        />
      )}
    </>
  );
};

export default memo(BaseNode);
