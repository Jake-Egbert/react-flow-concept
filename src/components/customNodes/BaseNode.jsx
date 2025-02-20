import { useState, useRef, useEffect, memo, useMemo } from "react";
import { Position, useUpdateNodeInternals, NodeToolbar } from "@xyflow/react";
import { useFlow } from "../../FlowContext";
import HandleModal from "../modals/HandleModal";
import CustomHandle from "../customEdges/CustomHandle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NodeTypeSelector from "../flowHelpers/NodeTypeSelector";

const nodeTypes = [
  {
    type: "reward",
    label: "Reward",
    icon: "fa-award",
  },
  {
    type: "presentation",
    label: "Presentation",
    icon: "fa-person-chalkboard",
  },
  {
    type: "challenge",
    label: "Challenge",
    icon: "fa-person-hiking",
  },
  {
    type: "conditional",
    label: "Set Conditional",
    icon: "fa-road-circle-check",
  },
  {
    type: "variable",
    label: "Set Variable",
    icon: "fa-shoe-prints",
  },
  {
    type: "adjustVariable",
    label: "Adjust Variable",
    icon: "fa-plus-minus",
  },
  {
    type: "removeItem",
    label: "Remove Item",
    icon: "fa-heart-circle-minus",
  },
  {
    type: "addItem",
    label: "Add Item",
    icon: "fa-heart-circle-plus",
  },
  {
    type: "group",
    label: "Group Items",
    icon: "fa-object-group",
  },
  {
    type: "storyline",
    label: "Link to Storyline",
    icon: "fa-mountain-city",
  },
  {
    type: "default",
    label: "Select Node",
    icon: "fa-arrow-right",
  },
];

const getNodeTypeConfig = (type) => {
  return nodeTypes.find((nodeType) => nodeType.type === type) || {};
};

const BaseNode = ({ id, children, type }) => {
  const [localHandles, setLocalHandles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { contextHandles } = useFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  let currentNodeType = useRef(type);

  const { label, icon } = getNodeTypeConfig(type);

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

    return initialHandles;
  }, [contextHandles]);

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
      <div className="custom-node-wrapper">
        <NodeToolbar position="bottom">
          <button className="toolbar-button" onClick={handleOpenModal}>
            Handles
          </button>
        </NodeToolbar>

        {localHandles.map((handle, index, arr) => {
          const handleCount = arr.filter(
            (h) => h.position === handle.position
          ).length;

          const yOffset = calculateYOffset(
            arr.filter((h) => h.position === handle.position).indexOf(handle),
            handleCount
          );

          return (
            <CustomHandle
              key={handle.id}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={{ top: `${yOffset}%` }}
            />
          );
        })}

        <div className={`node-header ${type}`}>
          {icon && (
            <FontAwesomeIcon icon={`fa-solid ${icon}`} className="node-icon" />
          )}
          <NodeTypeSelector
            nodeId={id}
            currentType={currentNodeType.current}
            label={label}
            availableTypes={[
              "presentation",
              "adjustVariable",
              "conditional",
              "variable",
              "challenge",
              "group",
              "removeItem",
              "addItem",
            ]}
          />
          {type === "group" ? (
            <input type="text" className="group-title" />
          ) : (
            ""
          )}
        </div>

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
