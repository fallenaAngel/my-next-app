import { useDroppable } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RenderItem from "./renderItem.tsx";

import {RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

export default function RenderDroppable(props: {
  NodeData: RenderNodeType[],
  onChangeCheckCom: (checkKey: RenderNodeType) => void
}) {
  const { NodeData, onChangeCheckCom } = props
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    width: '100%',
    height: '100%',
    border: isOver ? '1px solid #ccc' : 'none'
  };

  function onClickCom(nodeData: RenderNodeType) {
    onChangeCheckCom(nodeData)
  }

  const RenderList = NodeData.length ? NodeData.map(node => <RenderItem nodeData={node} key={node._uid} onClick={onClickCom}></RenderItem>) : null

  return (
    <div ref={setNodeRef} style={style}>
      <SortableContext items={NodeData} id="_uid" strategy={verticalListSortingStrategy}>
        {RenderList}
      </SortableContext>
    </div>
  );
}
