import React, { Suspense } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RenderNodeType } from "@/app/onlineDesign/_static/schema.type.ts";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form } from 'antd';
import { useNodeData } from '../_static/nodeDataStore';
import { DeleteNode } from '../_static/nodeData';

export default function RenderItem(props: { nodeData: RenderNodeType }) {
  const { nodeData } = props
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: nodeData._uid
  });

  const { nodeData: rootNodeData, setNodeData, checkCom, setCheckCom } = useNodeData();

  // 删除节点
  function onDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation()
    setNodeData(DeleteNode(rootNodeData, nodeData))
  }

  if (Array.isArray(nodeData.children) && nodeData.children.length && !nodeData.customInsertNodeData) {
    return nodeData.children.map(node => {
      return <Suspense fallback={<div>Loading...</div>} key={node._uid}>
        <RenderItem nodeData={node}></RenderItem>
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
        borderLeft: '5px solid transparent',
        backgroundColor: 'transparent',
      };
      const isActive = checkCom && checkCom._uid && (checkCom._uid === nodeData._uid)
      if (isActive) {
        style.backgroundColor = 'var(--ant-color-primary-bg)'
        style.borderLeft = '5px solid var(--ant-color-primary-border)'
      }

      return <div ref={setNodeRef} style={style} className='relative px-2.5 pt-1 pb-1.5' {...attributes} {...listeners}>
        <div className="darg-wrap" onClick={(e) => {
          e.stopPropagation()
          setCheckCom(nodeData)
        }}>
          <Form.Item label={nodeData.name} key={nodeData.key}>
            <RenderCom {...comProps}></RenderCom>
          </Form.Item>
        </div>
        <div className='absolute right-20 bottom-[-20px]' style={{ display: isActive ? 'block' : 'none' }}>
          <Button shape="circle" icon={<DeleteOutlined />} disabled={false} onClick={onDelete} />
        </div>
      </div>
    }
  }
}
