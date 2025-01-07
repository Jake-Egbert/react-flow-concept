import { useFlow } from "./FlowContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    {
      type: "setVariable",
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
      type: "conditonal",
      label: "Conditional",
      icon: "fa-road-circle-check",
    },
    {
      type: "setVariable",
      label: "Variable",
      icon: "fa-shoe-prints",
    },
    {
      type: "adjustQunatity",
      label: "Adjust Quantity",
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
      type: "link",
      label: "Link to Storyline",
      icon: "fa-mountain-city",
    },
  ];

  return (
    <div className="sidebar-container">
      {nodeTypes.map(({ type, label, icon }) => (
        <div
          key={type}
          className={`dndnode ${type}`}
          onClick={() => handleClick(type)}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          <FontAwesomeIcon icon={`fa-solid ${icon}`} className="node-icon" />
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
}
