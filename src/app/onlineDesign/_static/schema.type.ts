/*
* Created by 李丁丁 at 2024/7/5
* */

export const GenerateSchema = function ():Schema {
  return {
    config: {},
    children: []
  }
}
// 字段配置值类型
export type ConfigValueType = {
  label: string,
  key: string,
  type: string,
  value?: any,
  options?: {
    label: string,
    value: string
  }[]
}
export interface NodeType {
  name: string,
  key: string,
  comUrl: any,
  isCustomCom?: boolean,
  customInsertNodeData?: (node: RenderNodeType) => RenderNodeType,
  config: {
    [propsName: string]: ConfigValueType
  }
}

export interface RenderNodeType extends NodeType {
  id: string,
  _uid: string,
  _path: string,
  children?: [RenderNodeType]
}

export default interface Schema {
  children: RenderNodeType[],
  config: {}
}

