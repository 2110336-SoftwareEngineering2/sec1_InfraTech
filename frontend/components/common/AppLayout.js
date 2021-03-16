import React, { useState } from 'react';
import { Layout } from 'antd';

import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';
import { USER_TYPE } from '../../config/UserType.config';

const { Content } = Layout;

const AppLayout = ({ user, mutateUser, children, selectedMenu }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        userType={user?.type ?? USER_TYPE.GUEST}
        selectedMenu={selectedMenu}
      />
      <Layout>
        <Header
          username={user?.firstname}
          profileImageUrl={user?.profileImageUrl}
          clickMenu={() => setCollapsed(!collapsed)}
          mutateUser={mutateUser}
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
