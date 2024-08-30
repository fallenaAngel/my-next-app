import React, {Suspense} from 'react';

import {RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

export default function RenderItem(props: { nodeData: RenderNodeType }) {
  const {nodeData} = props
  if (Array.isArray(nodeData.children) && nodeData.children.length) {
    return nodeData.children.map(node => {
      return <Suspense fallback={<div>Loading...</div>} key={node.key}>
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
      return <RenderCom {...comProps}></RenderCom>
    }
  }
}
