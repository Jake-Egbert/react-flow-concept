import { useFlow } from "../../FlowContext";

const typeLabelMap = {
  reward: "reward",
  presentation: "Presentation",
  adjustVariable: "Adjust Variable",
  conditional: "Set Conditional",
  variable: "Set Variable",
  challenge: "Challenge",
  addItem: "Add Item",
  removeItem: "Remove Item",
  group: "Group Items",
  default: "Select Node",
};

const NodeTypeSelector = ({ nodeId, currentType, availableTypes }) => {
  const { setNodes } = useFlow();

  const normalizedType = currentType === "default" ? "default" : currentType;

  const filteredTypes =
    normalizedType === "default"
      ? ["default", ...availableTypes]
      : availableTypes.filter((type) => type !== "default");

  const handleTypeChange = (newType) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? { ...node, type: newType, data: { ...node.data, type: newType } }
          : node
      )
    );
  };

  return (
    <select
      value={normalizedType}
      onChange={(e) => handleTypeChange(e.target.value)}
      className="node-type-dropdown"
    >
      {filteredTypes.map((type) => (
        <option key={type} value={type}>
          {typeLabelMap[type] || type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default NodeTypeSelector;
