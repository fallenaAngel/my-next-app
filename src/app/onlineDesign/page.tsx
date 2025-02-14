"use client";

import { ConfigProvider, Col, Row } from "antd";
import ElementList from "@/app/onlineDesign/_components/elementList";
import RenderDroppable from "@/app/onlineDesign/_components/render.tsx";
import ComConfig from "@/app/onlineDesign/_components/comConfig/config.tsx";
import type {DragEndEvent} from "@dnd-kit/core";
import {DndContext, DragOverlay} from "@dnd-kit/core";
import {useState} from "react";
import {InsertNode} from './_static/nodeData.ts'
import SchemaType, {GenerateSchema, NodeType, RenderNodeType} from './_static/schema.type.ts'
import ThemeConfig from "./_components/themeConfig.tsx";

export default function OnlineDesign() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [nodeData, setNodeData] = useState<SchemaType['children']>(GenerateSchema().children);
  const [primary, setPrimary] = useState('#1677ff');
  const [checkCom, setCheckCom] = useState<RenderNodeType>();
  // 拖拽事件结束
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

  // 拖拽事件开始
  function handleDragStart(event: DragEndEvent) {
    setActiveId(event.active.id);
  }

  // 修改主题颜色
  function onChangeColor(color: string) {
    setPrimary(color);
  }

  // 切换当前选中的配置组件
  function onChangeCheckCom(checkKey: RenderNodeType) {
    setCheckCom(checkKey);
  }

  return (
    <ConfigProvider theme={{
      cssVar: true, hashed: false,
      token: {
        colorPrimary: primary
      }
    }}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Row className="h-screen" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col className="h-full overflow-x-none overflow-y-auto" span={6}>
            <ElementList></ElementList>
          </Col>
          <Col className="h-full overflow-x-none overflow-y-auto border-x border-solid border-slate-300" span={12}>
            <RenderDroppable
              NodeData={nodeData}
              onChangeCheckCom={onChangeCheckCom}
            ></RenderDroppable>
          </Col>
          <Col className="h-full overflow-x-none overflow-y-auto" span={6}>
            <ComConfig checkCom={checkCom}></ComConfig>
          </Col>
        </Row>
        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <div>{activeId}</div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <ThemeConfig primary={primary} onChangeColor={onChangeColor}></ThemeConfig>
    </ConfigProvider>
  )
}
