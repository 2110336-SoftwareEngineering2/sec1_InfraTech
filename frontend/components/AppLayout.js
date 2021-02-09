import React, { useState } from 'react';
import { Layout } from 'antd';

import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSignIn, setSignIn] = useState(false);

  return (
    <Layout>
      <Sider collapsed={collapsed} userType={'trainer'} />
      <Layout>
        <Header
          isSignIn={isSignIn}
          clickMenu={() => setCollapsed(!collapsed)}
          clickButton={() => setSignIn(!isSignIn)}
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
