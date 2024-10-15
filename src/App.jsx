import React, { useRef, useCallback, useEffect } from "react";
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { screenToFlowPosition, getNodes } = useReactFlow();
  const [type] = useDnD();

  const checkGroups = useCallback(() => {
    const groupNodes = getNodes().filter((node) => node.type === "group");
    console.log(groupNodes);
    groupNodes.forEach((groupNode) => {
      const children = getNodes().filter((child) => child.parentId === "");
      console.log(children);
      children.forEach((child) => {
        console.log(child);
        if (child.type !== "group") {
          if (isChildInGroup(child, groupNode)) {
            child.parentId = groupNode.id;
          }
        }
      });
    });
  }, [getNodes]);

  const isChildInGroup = (child, group) => {
    console.log("child", child);
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
  };

  useEffect(() => {
    checkGroups();
  }, [nodes]);

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
    [type, reactFlowWrapper.current]
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
