import { ConfigValueType, RenderNodeType } from "@/app/onlineDesign/_static/schema.type.ts"
import { Form, Input, Select, Switch } from "antd"

export default function ComConfig(props: {
  checkCom: RenderNodeType | undefined
}) {
  const { checkCom } = props
  const [form] = Form.useForm();
  function onValuesChange(changedValues: any) {
    for (let key in changedValues) {
      checkCom && checkCom.config && checkCom.config[key] && (checkCom.config[key].value = changedValues[key])
    }
  }
  if (checkCom && checkCom.config) {
    const initialValues: {[propsName: string]: any} = {}
    for (const key in checkCom.config) {
      if (Object.prototype.hasOwnProperty.call(checkCom.config, key) && checkCom.config[key].value) {
        const element = checkCom.config[key];
        initialValues[key] = element.value
      }
    }
    return <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
    >
      {
        Object.keys(checkCom.config).map((key: string) => {
          const item = checkCom.config[key] as ConfigValueType
          let renderCon = null
          if (item.type === 'switch') {
            renderCon = <Switch defaultChecked />
          } else if (item.type === 'input') {
            renderCon = <Input placeholder="请输入"/>
          } else if (item.type === 'select') {
            renderCon = <Select placeholder="请选择">{
              item.options && item.options.map(option => <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>)
            } </Select>
          }
          return <Form.Item label={item.label} name={item.key} key={item.key}>
            {renderCon}
          </Form.Item>
        })
      }
    </Form>
  }
}
