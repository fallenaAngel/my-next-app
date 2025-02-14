import React, { Suspense } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

export default function RenderItem(props: { nodeData: RenderNodeType, onClick: (nodeData: RenderNodeType) => void }) {
  const { nodeData, onClick } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: nodeData._uid
  });
  if (Array.isArray(nodeData.children) && nodeData.children.length && !nodeData.customInsertNodeData) {
    return nodeData.children.map(node => {
      return <Suspense fallback={<div>Loading...</div>} key={node._uid}>
        <RenderItem nodeData={node} onClick={() => onClick(nodeData)}></RenderItem>
      </Suspense>
    })
  } else {
    const RenderCom = nodeData ? nodeData.comUrl : null
    const comProps: {
      nodeConfig?: any
    } = {}
    if (nodeData.isCustomCom) {
      comProps.nodeConfig = nodeData.config
    }
    if (RenderCom) {
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // padding: '10px',
        // margin: '5px',
        // border: '1px solid #ccc',
        // backgroundColor: '#fff',
      };
      return <span ref={setNodeRef} style={style} {...attributes} {...listeners} ><RenderCom {...comProps} onClick={() => onClick(nodeData)}></RenderCom></span>
    }
  }
}
