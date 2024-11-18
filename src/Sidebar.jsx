import { useFlow } from "./FlowContext";

export default function Sidebar({ handleClick }) {
  const { setType, setContextHandles, contextHandles } = useFlow();

  const handleChange = (e) => {
    const { name } = e.target;
    setContextHandles((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = [
    "setVariable",
    "adjustQuantity",
    "conditional",
    "group",
    "presentation",
    "challenge",
  ];

  return (
    <div>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div className="handles-container">
        <div className="description">Handles on nodes</div>
        <div>
          <label>Left: </label>
          <input
            type="checkbox"
            name="left"
            onChange={handleChange}
            checked={contextHandles.left}
          />
        </div>
        <div>
          <label>right: </label>
          <input
            type="checkbox"
            name="right"
            onChange={handleChange}
            checked={contextHandles.right}
          />
        </div>
      </div>

      {nodeTypes.map((type) => (
        <div
          key={type}
          className={`dndnode ${type}`}
          onClick={() => handleClick(type)}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Node
        </div>
      ))}
    </div>
  );
}
