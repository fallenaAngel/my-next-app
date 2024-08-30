import {useDroppable} from "@dnd-kit/core";
import React, {Suspense} from 'react';
import RenderItem from "./renderItem.tsx";

import {RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

export default function RenderDroppable(props: { NodeData: RenderNodeType[] }) {
  const {NodeData} = props
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    width: '100%',
    height: '100px',
    border: isOver ? '1px solid #ccc' : 'none'
  };
  const RenderList = NodeData.length ? NodeData.map(node => {
    let renderCon = null
    if (node.children && node.children.length && !node.customInsertNodeData) {
      renderCon = <RenderItem nodeData={node}></RenderItem>
    } else {
      const RenderCom = node ? node.comUrl : null
      if (RenderCom) {
        const comProps: {
          node?: RenderNodeType
        } = {}
        if (node.isCustomCom) {
          comProps.node = node
        }
        renderCon = <RenderCom {...comProps}></RenderCom>
      }
    }
    return <Suspense fallback={<div>Loading...</div>} key={node._uid}>{renderCon}</Suspense>
  }) : null

  return (
    <div ref={setNodeRef} style={style}>{RenderList}</div>
  );
}
