import {
  SearchOutlined,
  ApiOutlined,
  RadarChartOutlined,
  CalendarOutlined,
  MessageOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { USER_TYPE } from './UserType.config';

export const MENU_ITEMS = {
  [USER_TYPE.GUEST]: [
    {
      text: 'Home',
      icon: <HomeOutlined />,
      href: '/',
    },
    {
      text: 'Browse',
      icon: <SearchOutlined />,
      href: '/browse',
    },
  ],
  [USER_TYPE.TRAINER]: [
    {
      text: 'Home',
      icon: <HomeOutlined />,
      href: '/',
    },
    {
      text: 'Browse',
      icon: <SearchOutlined />,
      href: '/browse',
    },
    {
      text: 'My Profile',
      icon: <UserOutlined />,
      href: '/profile',
    },
    {
      text: 'Request',
      icon: <ApiOutlined />,
      href: '/request',
    },
    {
      text: 'Chat',
      icon: <MessageOutlined />,
      href: '/chat/0',
    },
  ],
  [USER_TYPE.TRAINEE]: [
    {
      text: 'Home',
      icon: <HomeOutlined />,
      href: '/',
    },
    {
      text: 'Browse',
      icon: <SearchOutlined />,
      href: '/browse',
    },
    {
      text: 'My Profile',
      icon: <UserOutlined />,
      href: '/profile',
    },
    {
      text: 'My Courses',
      icon: <RadarChartOutlined />,
      href: '/course',
    },
    {
      text: 'Chat',
      icon: <MessageOutlined />,
      href: '/chat/0',
    },
  ],
};
