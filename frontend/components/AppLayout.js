import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  RadarChartOutlined,
  CalendarOutlined,
  MessageOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import styles from '../styles/AppLayout.module.css';

import Sider from './Sider';
import Footer from './Footer';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider collapsed={collapsed} userType={"trainer"} />
      <Layout className={styles['site-layout']}>
        <Header
          className={styles['site-layout-background']}
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {React.createElement(MenuOutlined, {
            className: styles['trigger'],
            onClick: () => setCollapsed(!collapsed),
          })}
          {React.createElement(UserOutlined, {
            className: styles['trigger'],
          })}
        </Header>
        <Content
          className={styles['site-layout-background']}
          style={{
            margin: '24px 16px 0',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
