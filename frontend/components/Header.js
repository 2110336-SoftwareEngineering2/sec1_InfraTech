import React from 'react';
import { Layout, Button } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

const Header = ({ isSignIn, clickMenu, clickButton }) => {
  return (
    <AntdHeader className="bg-white px-6 flex justify-between items-center">
      {React.createElement(MenuOutlined, {
        className: 'cursor-pointer text-lg transition-colors hover:text-blue',
        onClick: clickMenu,
      })}
      {isSignIn ? (
        <SignedOutHeader signIn={clickButton} />
      ) : (
        <SignedInHeader signOut={clickButton} />
      )}
    </AntdHeader>
  );
};

const SignedInHeader = ({ signOut }) => (
  <div>
    <Button className="ml-2" onClick={signOut}>
      Sign in
    </Button>
    <Button className="ml-2" type="primary">
      Sign up
    </Button>
  </div>
);

const SignedOutHeader = ({ signIn }) => (
  <div>
    {React.createElement(UserOutlined, {
      className:
        'text-lg mr-2 rounded-full bg-gray-200 h-10 w-10 inline-flex items-center justify-center cursor-pointer ',
    })}
    <Button className="ml-2" onClick={signIn} type="primary" danger>
      Sign out
    </Button>
  </div>
);

export default Header;
