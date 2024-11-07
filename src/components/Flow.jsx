import { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "../Sidebar";
import SetVariableNode from "../components/customNodes/SetVariableNode";
import AdjustQuantityNode from "../components/customNodes/AdjustQuantityNode";
import ConditionalNode from "../components/customNodes/ConditionalNode";
import GroupNode from "../components/customNodes/GroupNode";
import PresentationNode from "./customNodes/PresentationNode";
import ChallengeNode from "./customNodes/ChallengeNode";
import DefaultNode from "./customNodes/DefaultNode";
import { useFlow } from "../FlowContext";

const nodeTypes = {
  adjustQuantity: AdjustQuantityNode,
  presentation: PresentationNode,
  conditional: ConditionalNode,
  setVariable: SetVariableNode,
  challenge: ChallengeNode,
  default: DefaultNode,
  group: GroupNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [edges, setEdges] = useEdgesState([]);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const { type, nodes, setNodes, onNodesChange } = useFlow();

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const createNewNode = () => {
    const position = screenToFlowPosition({
      x: reactFlowWrapper.current.clientWidth / 2,
      y: reactFlowWrapper.current.clientHeight / 2,
    });

    const newNode = {
      id: getId(),
      type: "default",
      position: position,
      data: { label: "New Node" },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const createChildNode = () => {
    if (!selectedNodeId) return;

    const parentNode = getNodes().find((node) => node.id === selectedNodeId);
    const newNode = {
      id: getId(),
      type: "default",
      position: {
        x: parentNode.position.x,
        y: parentNode.position.y + 150,
      },
      data: { label: "Child Node" },
      parentId: parentNode.id,
    };

    setNodes((nds) => [...nds, newNode]);

    const newEdge = {
      id: `e${parentNode.id}-${newNode.id}`,
      source: parentNode.id,
      target: newNode.id,
      sourceHandle: "bottom",
      targetHandle: "top",
    };

    setEdges((eds) => addEdge(newEdge, eds));
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        navigateNodes(event.key);
        break;
      case "Enter":
        createChildNode();
        break;
      case "Tab":
        event.preventDefault();
        createNewNode();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNodeId]);

  const navigateNodes = (direction) => {
    const nodes = getNodes();
    const currentIndex = nodes.findIndex((node) => node.id === selectedNodeId);

    let newIndex = currentIndex;
    if (direction === "ArrowUp" || direction === "ArrowLeft") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : nodes.length - 1;
    } else if (direction === "ArrowDown" || direction === "ArrowRight") {
      newIndex = currentIndex < nodes.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedNodeId(nodes[newIndex].id);
  };

  const checkGroups = useCallback(() => {
    const groupNodes = getNodes().filter((node) => node.type === "group");
    let shouldUpdate = false;

    setNodes((nds) => {
      const updatedNodes = nds.map((node) => {
        if (node.type !== "group") {
          const parentGroup = groupNodes.find((groupNode) =>
            isChildInGroup(node, groupNode)
          );

          if (parentGroup && node.parentId !== parentGroup.id) {
            shouldUpdate = true;

            return {
              ...node,
              parentId: parentGroup.id,
              position: {
                x: node.position.x - parentGroup.position.x,
                y: node.position.y - parentGroup.position.y,
              },
              extent: "parent",
            };
          }
        }
        return node;
      });

      if (shouldUpdate) {
        const groupFirst = [
          ...groupNodes,
          ...updatedNodes.filter((n) => n.type !== "group"),
        ];
        return groupFirst;
      }

      return nds;
    });
  }, [getNodes, setNodes]);

  const isChildInGroup = useCallback((child, group) => {
    const childRect = {
      x: child.position.x,
      y: child.position.y,
      width: child.measured?.width || 100,
      height: child.measured?.height || 100,
    };

    const groupRect = {
      x: group.position.x,
      y: group.position.y,
      width: group.measured?.width || 100,
      height: group.measured?.height || 100,
    };

    return (
      childRect.x >= groupRect.x &&
      childRect.x + childRect.width <= groupRect.x + groupRect.width &&
      childRect.y >= groupRect.y &&
      childRect.y + childRect.height <= groupRect.y + groupRect.height
    );
  }, []);

  useEffect(() => {
    checkGroups();
  }, [nodes, checkGroups]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      if (!type || !reactFlowWrapper.current) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} node`,
        },
        parentId: "",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [type, screenToFlowPosition, setNodes]
  );

  const handleClick = useCallback(
    (type) => {
      if (!reactFlowWrapper.current || !type) return;

      const centerPosition = screenToFlowPosition({
        x: reactFlowWrapper.current.clientWidth / 2,
        y: reactFlowWrapper.current.clientHeight / 2,
      });

      const newNode = {
        id: getId(),
        type,
        position: centerPosition,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} node`,
        },
        parentId: "",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            style: {
              border:
                node.id === selectedNodeId
                  ? "2px solid blue"
                  : "1px solid black",
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar handleClick={handleClick} />
    </div>
  );
};

export default Flow;
