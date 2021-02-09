import { Layout, Menu } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  RadarChartOutlined,
  CalendarOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import styles from '../styles/AppLayout.module.css';

const { Sider: AntdSider } = Layout;

const Sider = ({ collapsed, userType }) => (
  <AntdSider trigger={null} collapsible collapsed={collapsed}>
    <div className={styles['logo']} />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<SearchOutlined />}>
        Browse
      </Menu.Item>
      <Menu.Item key="2" icon={<BellOutlined />}>
        Notification
      </Menu.Item>
      <Menu.Item key="3" icon={<RadarChartOutlined />}>
        My Courses
      </Menu.Item>
      <Menu.Item key="4" icon={<CalendarOutlined />}>
        Schedule
      </Menu.Item>
      <Menu.Item key="5" icon={<MessageOutlined />}>
        Chat
      </Menu.Item>
    </Menu>
  </AntdSider>
);

export default Sider;
