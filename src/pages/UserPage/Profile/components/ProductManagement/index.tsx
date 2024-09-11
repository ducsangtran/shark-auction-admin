import { Tabs, TabsProps } from "antd"
import MyProduct from "./components/MyProduct/MyProduct"
import MyAuction from "./components/MyAuction/MyAuction"
import { useState } from "react";

export const ProductManagement = () => {
  const [activeKey, setActiveKey] = useState("1");
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Sản phẩm',
      children: <MyProduct activeKey={activeKey} />
    },
    {
      key: '2',
      label: 'Đấu giá',
      children: <MyAuction activeKey={activeKey} />
    },
    {
      key: '3',
      label: 'My Bidding',
      children: 'My Bidding'
    },
    {
      key: '4',
      label: 'My Winning',
      children: 'My Winning'
    }
  ]
  return (
    <Tabs centered defaultActiveKey="1" items={items} activeKey={activeKey} onChange={handleTabChange} />
  )
}
