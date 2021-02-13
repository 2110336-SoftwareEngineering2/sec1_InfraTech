import React, { useState } from 'react';
import { Layout } from 'antd';

import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';
import { USER_TYPE } from '../config/UserType.config';

const { Content } = Layout;

const AppLayout = ({ userInfo, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userType, setUserType] = useState(
    Object.values(USER_TYPE).includes(userInfo?.userType)
      ? userInfo?.userType
      : USER_TYPE.GUEST,
  );

  return (
    <Layout>
      <Sider collapsed={collapsed} userType={userType} />
      <Layout>
        <Header
          username={userInfo?.firstname}
          profileImageUrl={userInfo?.profileImageUrl}
          clickMenu={() => setCollapsed(!collapsed)}
          handleSignOut={() => setUserType(USER_TYPE.GUEST)}
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
