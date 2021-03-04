import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';

import { MENU_ITEMS } from '../../config/Sider.config';

const { Sider: AntdSider } = Layout;

const Sider = ({ collapsed, userType }) => {
  const router = useRouter();
  const [isBroken, setIsBroken] = useState(collapsed);
  const [showLogoText, setShowLogoText] = useState(!collapsed);

  useEffect(() => {
    if (collapsed) {
      setTimeout(() => setShowLogoText(!collapsed), 30);
    } else {
      setTimeout(() => setShowLogoText(!collapsed), 145);
    }
  }, [collapsed]);

  return (
    <AntdSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      collapsedWidth={isBroken ? 0 : 80}
      width={isBroken ? 65 : 190}
      onBreakpoint={(broken) => setIsBroken(broken)}
    >
      <div
        className={`h-10 bg-black mx-3 mt-4 mb-8 flex items-center ${
          collapsed ? 'justify-center' : 'justify-start'
        } `}
      >
        <Image src="/logo.svg" width={40} height={40} />
        <span className="text-lg font-bold text-yellow hidden md:inline">
          {showLogoText && "Let's Exercise!"}
        </span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[router.pathname]}
      >
        {MENU_ITEMS[userType].map(({ text, icon, href }) => (
          <Menu.Item key={href} icon={icon} title={text}>
            <Link href={href}>{!isBroken && text}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </AntdSider>
  );
};

export default Sider;
