import { createContext, useContext } from 'react';
import SchemaType, { RenderNodeType } from './schema.type';

// 创建一个 Context
export const NodeDataContext = createContext<{
  nodeData: RenderNodeType[];
  setNodeData: (data: SchemaType['children']) => void;
  checkCom: RenderNodeType | undefined;
  setCheckCom: (checkKey: RenderNodeType) => void;
}>({
  nodeData: [],
  setNodeData: () => {},
  checkCom: undefined,
  setCheckCom: () => {}
});
export const useNodeData = () => useContext(NodeDataContext);
