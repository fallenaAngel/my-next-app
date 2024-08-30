/*
* Created by 李丁丁 at 2024/7/5
* */

export const GenerateSchema = function ():Schema {
  return {
    config: {},
    children: []
  }
}

export interface NodeType {
  name: string,
  key: string,
  comUrl: any,
  isCustomCom?: boolean,
  customInsertNodeData?: (node: RenderNodeType) => RenderNodeType,
  config?: {
    [propsName: string]: any
  }
}

export interface RenderNodeType extends NodeType {
  _uid: string,
  _path: string,
  children?: [RenderNodeType]
}

export default interface Schema {
  children: RenderNodeType[],
  config: {}
}

