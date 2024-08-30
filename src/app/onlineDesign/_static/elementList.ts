/*
* Created by 李丁丁 at 2024/6/12
* */
import dynamic from "next/dynamic";
import {generateRandomString} from "@/app/onlineDesign/_utils";
import {NodeType, RenderNodeType} from "@/app/onlineDesign/_static/schema.type.ts";

const ElementList = [
  {
    name: '通用',
    key: 'generalGroup',
    children: [
      {
        name: '按钮',
        key: 'Button',
        comUrl: dynamic(() => import("antd/lib/button"))
      },
      {
        name: '悬浮按钮',
        key: 'FloatButton',
        comUrl: dynamic(() => import("antd/lib/float-button"))
      }
    ]
  },
  {
    name: '布局',
    key: 'layoutGroup',
    children: [
      {
        name: '布局',
        key: 'Layout',
        comUrl: dynamic(() => import("antd/lib/layout"))
      },
      {
        name: '栅格',
        key: 'Grid',
        comUrl: dynamic(() => import("@/app/onlineDesign/_components/eleCom/grid.tsx")),
        isCustomCom: true,
        config: {
          colSpans: [8, 8, 8]
        },
        customInsertNodeData: function (node: RenderNodeType) {
          return {
            ...node,
            children: node.config && node.config.colSpans.map((v: number, index:number) => {
              return {
                _uid: generateRandomString(5, 'Col'),
                _path: node._path + '/children/' + index,
                name: 'Col',
                key: 'Col',
                comUrl: '',
                span: v,
                isCustomCom: true,
                children: []
              }
            })
          }
        }
      }
    ]
  },
  {
    name: '数据录入',
    key: 'dataEntryGroup',
    children: [
      {
        name: '输入框',
        key: 'Input',
        comUrl: dynamic(() => import("antd/lib/input")),
        config: {
          placeholder: '请输入'
        }
      },
      {
        name: '选择器',
        key: 'Select',
        comUrl: dynamic(() => import("antd/lib/select")),
        config: {
          placeholder: '请选择'
        }
      }
    ]
  }
]

export default ElementList
