import React from "react";
import { useDnD } from "./DnDContext";

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    console.log(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = ["setVariable", "adjustQuantity", "conditional"]; // Add other node types here

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {nodeTypes.map((type) => (
        <div
          key={type}
          className={`dndnode ${type}`}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Node
        </div>
      ))}
    </aside>
  );
};
