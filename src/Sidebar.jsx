import { useFlow } from "./FlowContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    label: "Conditional",
    icon: "fa-road-circle-check",
  },
  {
    type: "variable",
    label: "Variable",
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
];

export default function Sidebar({ handleClick }) {
  const { setType } = useFlow();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar-container">
      {nodeTypes.map(({ type, label, icon }) => (
        <div
          key={type}
          className={`node-wrapper ${type}`}
          onClick={() => handleClick(type)}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          <FontAwesomeIcon icon={`fa-solid ${icon}`} className="node-icon" />
          {label}
        </div>
      ))}
    </div>
  );
}
