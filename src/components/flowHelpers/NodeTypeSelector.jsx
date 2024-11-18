import { useState } from "react";
import { useFlow } from "../../FlowContext";

const NodeTypeSelector = ({ nodeId, currentType }) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const { setNodes } = useFlow();

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
          <option value="presentation">Presentation</option>
          <option value="adjustQuantity">Adjust Quantity</option>
          <option value="conditional">Conditional</option>
          <option value="setVariable">Set Variable</option>
          <option value="challenge">Challenge</option>
          <option value="group">Group</option>
        </select>
      )}
    </div>
  );
};

export default NodeTypeSelector;
