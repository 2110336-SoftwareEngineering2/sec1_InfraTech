import { Layout, Menu } from 'antd';
import { MENU_ITEMS } from '../config/Sider.config';

const { Sider: AntdSider } = Layout;

const Sider = ({ collapsed, userType }) => (
  <AntdSider trigger={null} collapsible collapsed={collapsed}>
    <div className='h-8 bg-gray-400 bg-opacity-30 m-4 mb-8' />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
      {MENU_ITEMS[userType].map(({ text, icon }, index) => (
        <Menu.Item key={index} icon={icon}>
          {text}
        </Menu.Item>
      ))}
    </Menu>
  </AntdSider>
);

export default Sider;
