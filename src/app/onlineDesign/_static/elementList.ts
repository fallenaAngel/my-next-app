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
        comUrl: dynamic(() => import("antd/lib/button")),
        config: {
          name: {
            label: '按钮名称',
            key: 'name',
            type: 'input',
            value: '按钮'
          },
          type: {
            label: '按钮类型',
            key: 'type',
            type: 'select',
            options: [
              {
                label: '默认',
                value: 'default'
              },
              {
                label: '主要',
                value: 'primary'
              },
              {
                label: '虚线',
                value: 'dashed'
              },
              {
                label: '链接',
                value: 'link'
              },
              {
                label: '文本',
                value: 'text'
              }
            ]
          },
          shape: {
            label: '按钮形状',
            key: 'shape',
            type: 'select',
            options: [
              {
                label: '默认',
                value: 'default'
              },
              {
                label: '圆',
                value: 'circle'
              },
              {
                label: '圆角',
                value: 'round'
              }
            ]
          },
          size: {
            label: '按钮大小',
            key: 'size',
            type: 'select',
            options: [
              {
                label: '默认',
                value: 'middle'
              },
              {
                label: '大',
                value: 'large'
              },
              {
                label: '小',
                value: 'small'
              }
            ]
          },
          autoInsertSpace: {
            label: '自动插入空格',
            key: 'autoInsertSpace',
            type: 'switch',
            default: false
          },
          icon: {
            label: '图标',
            key: 'icon',
            type: 'input'
          },
          iconPosition: {
            label: '图标位置',
            key: 'iconPosition',
            type: 'select',
            options: [
              {
                label: '左',
                value: 'start'
              },
              {
                label: '右',
                value: 'end'
              }
            ]
          }
        }
      },
      {
        name: '悬浮按钮',
        key: 'FloatButton',
        comUrl: dynamic(() => import("antd/lib/float-button")),
        config: {}
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
        comUrl: dynamic(() => import("antd/lib/layout")),
        config: {}
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
          const colSpans = node.config && node.config.colSpans ? node.config.colSpans : [8, 8, 8]
          return {
            ...node,
            children: Array.isArray(colSpans) ? colSpans.map((v: number, index:number) => {
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
            }) : []
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
          placeholder: {
            label: '输入框提示',
            key: 'placeholder',
            type: 'input'
          }
        }
      },
      {
        name: '选择器',
        key: 'Select',
        comUrl: dynamic(() => import("antd/lib/select")),
        config: {
          placeholder: {
            label: '选择器提示',
            key: 'placeholder',
            type: 'input'
          }
        }
      }
    ]
  }
]

export default ElementList
