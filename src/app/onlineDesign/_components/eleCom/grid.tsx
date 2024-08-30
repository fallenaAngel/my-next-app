import {Col, Row} from 'antd';
import {useDroppable} from "@dnd-kit/core";
import RenderItem from "@/app/onlineDesign/_components/renderItem.tsx";
import {RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

const RenderCol = function (col: any, index: number, node: RenderNodeType) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'GridDroppable_col_' + index,
    data: {
      node: node.children ? node.children[index] : null
    }
  });
  const style = {
    width: '100%',
    minHeight: '50px',
    border: isOver ? '1px solid red' : '1px solid #fcc'
  };
  return <Col span={col.span} key={col.key + index}>
    <div ref={setNodeRef} style={style}>
      {(col.children && col.children.length) ? <RenderItem nodeData={col}></RenderItem> : 'Col'}
    </div>
  </Col>
}
export default function GridCom(props: { node: RenderNodeType }) {
  const {node} = props

  let colList = null
  if (node.children && node.children.length) {
    colList = node.children.map((col: any, index: number) => RenderCol(col, index, node))
  }

  return (
    <Row>{colList}</Row>
  )
}
