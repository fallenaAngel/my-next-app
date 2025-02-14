import { RenderNodeType } from "../../_static/schema.type"

export default function RenderButton(props: {
  node?: RenderNodeType
}) {
  const { node } = props
  return <button>{node?.config.text.value}</button>
}