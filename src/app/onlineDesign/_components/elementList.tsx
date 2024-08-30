import {useDraggable} from '@dnd-kit/core';
import ElementData from "../_static/elementList.ts";
import {Card, Flex} from "antd";

function RenderDraggableItem(props: { eleData: { name: string, key: string } }) {
  const {key, name} = props.eleData
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: key,
    data: props.eleData
  });
  const style = transform ? {
    // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>{name}</div>
  );
}

export default function RenderEleList() {
  return ElementData.map((ele) => {
    return (
      <Card title={ele.name} bordered={false} key={ele.key}>
        <Flex wrap gap="small">
          {
            ele.children.map((child) => {
              return <RenderDraggableItem
                key={child.key}
                eleData={child}
              ></RenderDraggableItem>
            })
          }
        </Flex>
      </Card>
    )
  })
}
