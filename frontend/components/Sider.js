import { Layout, Menu } from 'antd';
import menuItems from '../config/Sider.config';

const { Sider: AntdSider } = Layout;

const Sider = ({ collapsed, userType }) => (
  <AntdSider trigger={null} collapsible collapsed={collapsed}>
    <div className='h-8 bg-gray-400 bg-opacity-30 m-4 mb-8' />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {menuItems[userType].map((item, index) => (
        <Menu.Item key={(index + 1).toString()} icon={item.icon}>
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  </AntdSider>
);

export default Sider;
