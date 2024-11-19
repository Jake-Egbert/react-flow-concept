import { useState } from "react";
import { useFlow } from "../../FlowContext";

const NodeTypeSelector = ({ nodeId, currentType, availableTypes }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const { setNodes } = useFlow();

  const filteredTypes =
    currentType === "default" ||
    currentType === "startNode" ||
    currentType === "childNode"
      ? ["default", ...availableTypes]
      : availableTypes.filter(
          (type) => type !== "default" && type !== "startNode"
        );

  const handleTypeChange = (newType) => {
    setNodes((nds) =>
      nds?.map((node) =>
        node.id === nodeId
          ? { ...node, type: newType, data: { ...node.data, type: newType } }
          : node
      )
    );
    setIsSelecting(false);
  };

  return (
    <div>
      <button onClick={() => setIsSelecting(!isSelecting)}>+</button>
      {isSelecting && (
        <select
          value={currentType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          {filteredTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default NodeTypeSelector;
