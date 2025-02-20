"use client";

import {useState} from "react";
import { ConfigProvider, Col, Row } from "antd";
import ElementList from "@/app/onlineDesign/_components/elementList";
import RenderDroppable from "@/app/onlineDesign/_components/render.tsx";
import ComConfig from "@/app/onlineDesign/_components/comConfig/config.tsx";
import type {DragEndEvent} from "@dnd-kit/core";
import { DndContext, DragOverlay, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from '@dnd-kit/sortable';
import {InsertNode} from './_static/nodeData.ts'
import SchemaType, {GenerateSchema, NodeType, RenderNodeType} from './_static/schema.type.ts'
import ThemeConfig from "./_components/themeConfig.tsx";
import { NodeDataContext } from "./_static/nodeDataStore.ts";

export default function OnlineDesign() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [nodeData, setNodeData] = useState<SchemaType['children']>(GenerateSchema().children);
  const [primary, setPrimary] = useState('#1677ff');
  const [checkCom, setCheckCom] = useState<RenderNodeType>();
  const sensors = useSensors(useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5
    }
  }))
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
    } else if (active.id && over.id && active.id !== over.id) {
      // 计算新的排序
      setNodeData((items) => {
        const oldIndex = items.findIndex((item) => item._uid === active.id);
        const newIndex = items.findIndex((item) => item._uid === over.id);
        // TODO 交换位置并且更新_path
        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log('newItems', oldIndex, newIndex,newItems);
        
        return newItems;
      });
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

  return (
    <ConfigProvider theme={{
      cssVar: true, hashed: false,
      token: {
        colorPrimary: primary
      }
    }}>
      <NodeDataContext.Provider value={{ nodeData, setNodeData, checkCom, setCheckCom }}>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <Row className="h-screen" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col className="h-full overflow-x-none overflow-y-auto" span={6}>
            <ElementList></ElementList>
          </Col>
          <Col className="h-full overflow-x-none overflow-y-auto border-x border-solid border-slate-300" span={12}>
            <RenderDroppable
              NodeData={nodeData}
            ></RenderDroppable>
          </Col>
          <Col className="h-full overflow-x-none overflow-y-auto" span={6}>
            <ComConfig checkCom={checkCom}></ComConfig>
          </Col>
        </Row>
        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <div style={{ width: '100%', height: '4px', borderBottom: '4px solid #f00' }}></div>
          ) : null}
        </DragOverlay>
      </DndContext>
      </NodeDataContext.Provider>
      <ThemeConfig primary={primary} onChangeColor={onChangeColor}></ThemeConfig>
    </ConfigProvider>
  )
}
