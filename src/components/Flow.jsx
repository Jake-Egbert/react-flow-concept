import { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
  useUpdateNodeInternals,
  useEdgesState,
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
  startNode: (props) => <DefaultNode {...props} oneHandle={true} />,
  challenge: ChallengeNode,
  default: DefaultNode,
  group: GroupNode,
};

let id = 2;
const getId = () => `node_${id++}`;

const Flow = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const { type, nodes, setNodes, onNodesChange, contextHandles } = useFlow();

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

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
    [type, screenToFlowPosition, setNodes, contextHandles]
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedNodeId) return;

      const nodes = getNodes();
      const selectedNodeIndex = nodes.findIndex(
        (node) => node.id === selectedNodeId
      );

      let newSelectedNodeId = selectedNodeId;

      switch (event.key) {
        case "ArrowUp":
          if (selectedNodeIndex > 0) {
            newSelectedNodeId = nodes[selectedNodeIndex - 1].id;
          }
          break;
        case "ArrowDown":
          if (selectedNodeIndex < nodes.length - 1) {
            newSelectedNodeId = nodes[selectedNodeIndex + 1].id;
          }
          break;
        case "Enter":
          createChildNode(selectedNodeId);
          break;
        case "Tab":
          event.preventDefault();
          createDefaultNode();
          break;
        default:
          break;
      }

      setSelectedNodeId(newSelectedNodeId);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, getNodes, setSelectedNodeId]);

  const createChildNode = useCallback(
    (parentId) => {
      const parent = nodes.find((node) => node.id === parentId);
      if (!parent) return;

      const newNodeId = getId();

      const newChildNode = {
        id: newNodeId,
        type: "default",
        position: {
          x: parent.position.x + 150,
          y: parent.position.y + 150,
        },
        data: {
          label: "Child Node",
        },
      };

      setNodes((nds) => nds.concat(newChildNode));

      const newEdgeId = `xy-edge__${parentId}-right-${newNodeId}-left`;
      if (!edges.find((edge) => edge.id === newEdgeId)) {
        const newEdge = {
          id: newEdgeId,
          source: parentId,
          target: newNodeId,
          sourceHandle: `${parentId}-right`,
          targetHandle: `${newNodeId}-left`,
        };

        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [nodes, edges, setNodes, setEdges]
  );
  const createDefaultNode = useCallback(() => {
    const newNode = {
      id: getId(),
      type: "default",
      position: { x: 250, y: 250 },
      data: { label: "Default Node" },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className="dndflow">
      <Sidebar handleClick={handleClick} />
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
          onEdgesChange={onEdgesChange}
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
    </div>
  );
};

export default Flow;
