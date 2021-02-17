import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MENU_ITEMS } from '../config/Sider.config';

const { Sider: AntdSider } = Layout;

const Sider = ({ collapsed, userType }) => {
  const [isBroken, setIsBroken] = useState(false);

  return (
    <AntdSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      collapsedWidth={isBroken ? 0 : 80}
      width={isBroken ? 65 : 170}
      onBreakpoint={(broken) => setIsBroken(broken)}
    >
      <div className="h-8 bg-gray-400 bg-opacity-30 m-4 mb-8" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['0']}
        inlineCollapsed={collapsed}
      >
        {MENU_ITEMS[userType].map(({ text, icon }, index) => (
          <Menu.Item key={index} icon={icon} title={text}>
            {!isBroken && text}
          </Menu.Item>
        ))}
      </Menu>
    </AntdSider>
  );
};

export default Sider;
