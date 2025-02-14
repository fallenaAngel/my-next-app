"use client";

import { useState } from "react";
import type { Color } from "antd/es/color-picker/color";
import { Drawer, Affix, ColorPicker, Input, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export default function ThemeConfig({ primary, onChangeColor }: { primary: string, onChangeColor: (color: string) => void }) {
  const [currentPrimary, setPrimary] = useState(primary);
  const [open, setOpen] =useState(false);

  // 打开主题配置
  function onOpenThemeConfig() {
    setOpen(true);
  }
  // 关闭主题配置
  function onCloseThemeConfig() {
    setOpen(false);
  }
  // 修改主题颜色
  function onChangeCurrentColor(color: Color) {
    setPrimary(color.toHexString());
    console.log('primary', primary);
    
    onChangeColor(currentPrimary)
  }
  return (
    <>
      <Affix offsetBottom={20} className="fixed right-5">
        <SettingOutlined className="iconHover" onClick={onOpenThemeConfig} />
      </Affix>
      <Drawer title="Basic Drawer" onClose={onCloseThemeConfig} open={open}>
        <ColorPicker showText value={currentPrimary} onChange={onChangeCurrentColor} />
        <Input placeholder="Please Input" />
        <Button type="primary">Submit</Button>
      </Drawer>
    </>
  );
}
