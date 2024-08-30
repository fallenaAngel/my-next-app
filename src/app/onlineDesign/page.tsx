"use client";

import {Col, Row} from "antd";
import ElementList from "@/app/onlineDesign/_components/elementList";
import RenderDroppable from "@/app/onlineDesign/_components/render.tsx";
import type {DragEndEvent} from "@dnd-kit/core";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {useState} from "react";
import {InsertNode} from './_static/nodeData.ts'
import SchemaType, {GenerateSchema, NodeType, RenderNodeType} from './_static/schema.type.ts'

export default function OnlineDesign() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [nodeData, setNodeData] = useState<SchemaType['children']>(GenerateSchema().children);

  function handleDragEnd(event: DragEndEvent) {
    console.log('event', event)
    const {over, active} = event
    if (!over) return
    if (over.id === 'droppable') {
      if (active.data && active.data.current) {
        setNodeData((data) => {
          return InsertNode(data, null, active.data.current as NodeType)
        })
      }
    } else if (over.data && over.data.current && active.data && active.data.current) {
      setNodeData((data) => {
        return InsertNode(data, over.data.current!.node as RenderNodeType, active.data.current as NodeType)
      })
    }
    setActiveId(null);
  }

  function handleDragStart(event: DragEndEvent) {
    setActiveId(event.active.id);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Row className="h-screen" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <Col className="h-full overscroll-x-none overscroll-y-auto" span={6}>
          <ElementList></ElementList>
        </Col>
        <Col className="h-full overscroll-x-none overscroll-y-auto" span={12}>
          <RenderDroppable
            NodeData={nodeData}
          ></RenderDroppable>
        </Col>
        <Col className="h-full overscroll-x-none overscroll-y-auto" span={6}>
          <div>col-6</div>
        </Col>
      </Row>
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <div>{activeId}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
