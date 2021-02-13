import React from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Image from 'next/image';
// import { Image } from 'antd';

import { Layout, Button } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

const Header = ({ clickMenu, username, profileImageUrl, handleSignOut }) => (
  <AntdHeader className="bg-white px-6 flex justify-between items-center">
    <MenuOutlined
      className="cursor-pointer text-lg transition-colors hover:text-blue"
      onClick={clickMenu}
    />
    {username ? (
      <NonGuestHeader
        username={username}
        profileImageUrl={profileImageUrl}
        handleSignOut={handleSignOut}
      />
    ) : (
      <GuestHeader />
    )}
  </AntdHeader>
);

const GuestHeader = () => (
  <div>
    <Link href="/login">
      <Button className="ml-2">Sign in</Button>
    </Link>
    <Button className="ml-2" type="primary">
      Sign up
    </Button>
  </div>
);

const NonGuestHeader = ({ username, profileImageUrl, handleSignOut }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  console.log(profileImageUrl);

  // TODO: Connect to logout API
  const onClick = () => {
    removeCookie('user', { path: '/' });
    handleSignOut();
  };

  // TODO: Set image to center
  return (
    <div className="font-bold text-lg">
      <UserOutlined className="text-lg mr-4 rounded-full bg-gray-200 h-10 w-10 inline-flex items-center justify-center cursor-pointer " />
      {/* <Image className='rounded-full my-auto mx-0' src={profileImageUrl} width={40} height={40} /> */}
      {username}
      <Link href="/">
        <Button className="ml-6" onClick={onClick} type="primary" danger>
          Sign out
        </Button>
      </Link>
    </div>
  );
};

export default Header;
