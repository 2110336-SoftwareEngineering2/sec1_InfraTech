import React from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import getConfig from 'next/config';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { COOKIE_NAME } from '../../config/config';

const { publicRuntimeConfig } = getConfig();
const { Header: AntdHeader } = Layout;

const Header = ({ clickMenu, username, profileImageUrl, mutateUser }) => (
  <AntdHeader className="bg-white px-4 sm:px-6 flex justify-between items-center">
    <MenuOutlined
      className="cursor-pointer text-lg transition-colors hover:text-blue"
      onClick={clickMenu}
    />
    {username ? (
      <NonGuestHeader
        username={username}
        profileImageUrl={profileImageUrl}
        mutateUser={mutateUser}
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
    <Link href="/register">
      <Button className="ml-2" type="primary">
        Sign up
      </Button>
    </Link>
  </div>
);

const NonGuestHeader = ({ username, profileImageUrl = '', mutateUser }) => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
  const isProfileImageUrlValid =
    publicRuntimeConfig.imageDomains.filter(
      (domain) => profileImageUrl && profileImageUrl.includes(domain),
    ).length !== 0;

  const onClick = () => {
    Router.push('/');
    removeCookie(COOKIE_NAME, { path: '/' });
    mutateUser(null);
  };

  return (
    <div className="flex items-center text-lg">
      <div className="rounded-full mt-1.5">
        <Image
          className="rounded-full"
          src={isProfileImageUrlValid ? profileImageUrl : '/avatar.svg'}
          width={40}
          height={40}
        />
      </div>
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
