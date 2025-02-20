import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RenderItem from "./renderItem.tsx";
import { Form } from "antd"

import {RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

export default function RenderDroppable(props: {
  NodeData: RenderNodeType[]
}) {
  const { NodeData } = props
  const [form] = Form.useForm();
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    border: isOver ? '1px solid #ccc' : 'none'
  };

  const RenderList = NodeData.length ? NodeData.map(node => <RenderItem nodeData={node} key={node._uid}></RenderItem>) : null

  return (
    <div ref={setNodeRef} style={style} className="w-full h-full pd-10">
      <Form
        layout="vertical"
        disabled={true}
        form={form}
      >
          <SortableContext items={NodeData} id="_uid" strategy={verticalListSortingStrategy}>
            {RenderList}
          </SortableContext>
      </Form>
    </div>
  );
}
