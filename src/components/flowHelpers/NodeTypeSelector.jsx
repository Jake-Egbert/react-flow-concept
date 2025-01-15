import { useFlow } from "../../FlowContext";

const typeLabelMap = {
  presentation: "Presentation",
  adjustVariable: "Adjust Variable",
  conditional: "Set Conditional",
  variable: "Set Variable",
  challenge: "Challenge",
  group: "Group Items",
  default: "Default",
  startNode: "Start Node",
  childNode: "Child Node",
};

const NodeTypeSelector = ({ nodeId, currentType, availableTypes, label }) => {
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
      value={currentType}
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
