/*
* Created by 李丁丁 at 2024/6/25
* */
import update from 'immutability-helper';
import {generateRandomString} from "@/app/onlineDesign/_utils";
import {NodeType, RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

/**
 * @description 根据_path解析生成更新数据路径
 */
const GeneratePath = function (path: string, val: RenderNodeType) {
  const parts = path.split('/').slice(1); // 分割路径并去掉第一个部分 "root"

  if (parts.length === 1) {
    return {$push: [val]}; // 处理特殊情况 "root/0"
  }

  let obj = {};
  let current: {
    [propsName: string]: any
  } = obj;

  parts.forEach((part, index) => {
    if (index % 2 === 0) {
      // 如果是 key 的部分
      const key = part;
      if (!current[key]) {
        current[key] = {};
      }
      if (index + 1 < parts.length && parts[index + 1] === 'children') {
        // 如果下一个部分是 "children"
        if (!current[key]['children']) {
          current[key]['children'] = {};
        }
        current = current[key]['children'];
      } else {
        current = current[key];
      }
    }
  });

  // 在最后一个节点添加固定结构 {children: {$push: []}}
  current.children = {$push: [val]};

  return obj;
}
export const InsertNode = function (rootNode: RenderNodeType[], parentNode: RenderNodeType | null, insertData: NodeType) {
  let val: RenderNodeType = {
    ...insertData,
    _uid: generateRandomString(5, insertData.key),
    _path: ''
  }
  // 第一级元素
  if (!parentNode) {
    val._path = 'root/' + rootNode.length
  } else {
    // 嵌套子级元素
    val._path = parentNode._path + '/' + insertData.key
  }
  // 如果插入节点类型有自定义处理节点数据逻辑，去执行
  if (insertData.customInsertNodeData) {
    val = insertData.customInsertNodeData(val)
  }
  // 动态根据_path生成update插入对象结构，eg：{a: {b: {$push: [val]}}}
  const updateObj = GeneratePath(val._path, val)
  console.log('updateObj', updateObj)
  return update(rootNode, updateObj)
}
