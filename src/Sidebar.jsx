import { useFlow } from "./FlowContext";

export default function Sidebar() {
  const { setType, setContextHandles } = useFlow();

  const handleChange = (e) => {
    const { name } = e.target;
    setContextHandles((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    console.log(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = [
    "setVariable",
    "adjustQuantity",
    "conditional",
    "group",
    "presentation",
  ];

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div className="handles-container">
        <div className="description">Handles on nodes</div>
        <div>
          <label>Left: </label>
          <input type="checkbox" name="left" onChange={handleChange} />
        </div>
        <div>
          <label>Top: </label>
          <input type="checkbox" name="top" onChange={handleChange} checked />
        </div>
        <div>
          <label>right: </label>
          <input type="checkbox" name="right" onChange={handleChange} />
        </div>
        <div>
          <label>bottom: </label>
          <input type="checkbox" name="bottom" onChange={handleChange} />
        </div>
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
}
