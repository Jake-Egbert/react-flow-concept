import { useFlow } from "../../FlowContext";

const NodeTypeSelector = ({ nodeId, currentType, availableTypes }) => {
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
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default NodeTypeSelector;
