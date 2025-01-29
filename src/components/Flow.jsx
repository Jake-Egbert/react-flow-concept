import { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  useReactFlow,
  Background,
  Position,
  useEdgesState,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "../Sidebar";
import SetVariableNode from "../components/customNodes/SetVariableNode";
import AdjustVariableNode from "./customNodes/AdjustVariableNode";
import ConditionalNode from "../components/customNodes/ConditionalNode";
import GroupNode from "../components/customNodes/GroupNode";
import PresentationNode from "./customNodes/PresentationNode";
import ChallengeNode from "./customNodes/ChallengeNode";
import DefaultNode from "./customNodes/DefaultNode";
import ConnectionLine from "./customEdges/ConnectionLine";
import { useFlow } from "../FlowContext";

const nodeTypes = {
  reward: DefaultNode,
  presentation: PresentationNode,
  challenge: ChallengeNode,
  conditional: ConditionalNode,
  variable: SetVariableNode,
  adjustVariable: AdjustVariableNode,
  removeItem: DefaultNode,
  addItem: DefaultNode,
  default: DefaultNode,
  group: GroupNode,
  startNode: (props) => <DefaultNode {...props} oneHandle={true} />,
  childNode: (props) => <DefaultNode {...props} noHandle={true} />,
};

let id = 2;
const getId = () => `node_${id++}`;

const Flow = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const { type, nodes, setNodes, onNodesChange, contextHandles } = useFlow();

  const proOptions = { hideAttribution: true };

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
            console.log(node);

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

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, style: { stroke: "#fec797", strokeWidth: 1 } },
          eds
        )
      ),
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
          label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
        },
        parentId: "",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [type, screenToFlowPosition, setNodes, contextHandles]
  );

  // const onConnect = useCallback(
  //   (connection) => {
  //     const edge = { ...connection, className: 'my-custom-edge' };
  //     setEdges((eds) => addEdge(edge, eds));
  //   },
  //   [setEdges]
  // );

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

  const createChildNode = useCallback(
    (parentId) => {
      const parent = nodes.find((node) => node.id === parentId);
      if (!parent) return;

      const newNodeId = getId();

      const newChildNode = {
        id: newNodeId,
        type: "childNode",
        position: {
          x: parent.position.x + 150,
          y: parent.position.y + 150,
        },
        data: {
          label: "Child Node",
        },
      };

      const newChildHandles = [
        {
          position: Position.Left,
          type: "target",
          id: `${newNodeId}-left`,
        },
        {
          position: Position.Right,
          type: "source",
          id: `${newNodeId}-right`,
        },
      ];

      setNodes((nds) =>
        nds.concat({
          ...newChildNode,
          handles: newChildHandles,
        })
      );

      const newEdgeId = `xy-edge__${parentId}-right-${newNodeId}-left`;
      if (!edges.find((edge) => edge.id === newEdgeId)) {
        const newEdge = {
          id: newEdgeId,
          source: parentId,
          target: newNodeId,
          sourceHandle: `${parentId}-right`,
          targetHandle: `${newNodeId}-left`,
          className: "custom-edge",
          style: { stroke: "#fec797", strokeWidth: 1 },
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

  function MiniMapNode(props) {
    const { x, y, width, height, className, style, data } = props;

    const label = data?.label || "Node";

    function getSignalName(str) {
      const lastDashIndex = str.lastIndexOf("-");

      if (lastDashIndex === -1) {
        return str;
      }

      let signalPart = str.slice(lastDashIndex + 1);

      const words = signalPart.split(" ");

      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace(/\s+/g, "-");
    }

    return (
      <svg
        width={width || 100}
        height={height || 50}
        transform={`translate(${x}, ${y})`}
      >
        <rect
          x="0"
          y="0"
          width={width || 100}
          height={height || 50}
          rx="15"
          ry="15"
          fill="#FFFFFF"
          stroke="#FFA500"
          strokeWidth="2"
        />
        <rect
          x="0"
          y="0"
          width={width || 100}
          height="40"
          rx="15"
          ry="15"
          fill="#007D66"
        />
        <text
          x={(width || 100) / 2}
          y="25"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          {label}
        </text>
      </svg>
    );
  }

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/1/");
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (isMounted) {
          setData(result);
          console.log(data);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

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

  useEffect(() => {
    checkGroups();
  }, [nodes, checkGroups]);

  return (
    <div className="dndflow">
      <Sidebar handleClick={handleClick} />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            style: {
              border: node.id === selectedNodeId ? "1px solid blue" : "",
            },
          }))}
          connectionLineComponent={ConnectionLine}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onDragOver={onDragOver}
          proOptions={proOptions}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          edges={edges}
          fitView
        >
          <MiniMap
            nodeClassName={(node) => `minimap-node-${node.type}`}
            position="bottom-left"
            nodeBorderRadius={30}
            nodeComponent={(nodeProps) => <MiniMapNode {...nodeProps} />}
            type={(node) => node.type}
            zoomable
            pannable
          />

          <Background color="#ccc" />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
