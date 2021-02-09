import React, { useState } from 'react';
import { Layout } from 'antd';

import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';
import { USER_TYPE } from '../config/UserType.config';

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSignIn, setSignIn] = useState(false);
  const [userType, setUserType] = useState(USER_TYPE.GUEST);

  return (
    <Layout>
      <Sider collapsed={collapsed} userType={userType} />
      <Layout>
        <Header
          isSignIn={isSignIn}
          clickMenu={() => setCollapsed(!collapsed)}
          clickButton={() => {
            setSignIn(!isSignIn);
            if (!isSignIn) {
              setUserType(USER_TYPE.TRAINER);
            } else {
              setUserType(USER_TYPE.GUEST);
            }
          }}
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
