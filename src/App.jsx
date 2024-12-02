import { useRef, useCallback, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "./Sidebar";
import QRScanner from "./QRScanner";
import SetVariableNode from "./components/customNodes/SetVariableNode";
import AdjustQuantityNode from "./components/customNodes/AdjustQuantityNode";
import ConditionalNode from "./components/customNodes/ConditionalNode";
import GroupNode from "./components/customNodes/GroupNode";
import { DnDProvider, useDnD } from "./DnDContext";

import "./index.css";
import "./styles/custom-nodes/set-variable.css";

const nodeTypes = {
  setVariable: SetVariableNode,
  adjustQuantity: AdjustQuantityNode,
  conditional: ConditionalNode,
  group: GroupNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  // const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const [type] = useDnD();

  const checkGroups = useCallback(() => {
    const groupNodes = getNodes().filter((node) => node.type === "group");
    let shouldUpdate = false;

    setNodes((nds) =>
      nds.map((node) => {
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
      })
    );

    if (shouldUpdate) {
      setNodes((nds) => [...nds]);
    }
  }, [getNodes, setNodes]);

  const isChildInGroup = useCallback((child, group) => {
    const childRect = {
      x: child.position.x,
      y: child.position.y,
      width: child.measured && child.measured.width ? child.measured.width : 0,
      height:
        child.measured && child.measured.height ? child.measured.height : 0,
    };

    const groupRect = {
      x: group.position.x,
      y: group.position.y,
      width: group.measured && group.measured.width ? group.measured.width : 0,
      height:
        group.measured && group.measured.height ? group.measured.height : 0,
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
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} node` },
        parentId: "",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [type, screenToFlowPosition, setNodes]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar />
      {<QRScanner />}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
