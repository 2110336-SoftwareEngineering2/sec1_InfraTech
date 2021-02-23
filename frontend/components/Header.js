import React from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Image from 'next/image';

import { Layout, Button } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

const Header = ({ clickMenu, username, profileImageUrl, handleSignOut }) => (
  <AntdHeader className="bg-white px-4 sm:px-6 flex justify-between items-center">
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
  const [cookies, setCookie, removeCookie] = useCookies([
    process.env.NEXT_PUBLIC_COOKIE_NAME,
  ]);

  // TODO: Connect to logout API
  const onClick = () => {
    removeCookie(process.env.NEXT_PUBLIC_COOKIE_NAME, { path: '/' });
    handleSignOut();
  };

  return (
    <div className="flex items-center text-lg">
      {profileImageUrl ? (
        <div className="rounded-full mt-1.5">
          <Image
            className="rounded-full"
            src={profileImageUrl}
            width={40}
            height={40}
          />
        </div>
      ) : (
        <UserOutlined className="text-lg mr-4 rounded-full bg-gray-200 h-10 w-10 inline-flex items-center justify-center cursor-pointer" />
      )}
      <div className="font-bold ml-4 hidden sm:inline">{username}</div>
      <Link href="/">
        <Button className="ml-6" onClick={onClick} type="primary" danger>
          Sign out
        </Button>
      </Link>
    </div>
  );
};

export default Header;
