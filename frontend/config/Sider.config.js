import {
  SearchOutlined,
  BellOutlined,
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
      text: 'Notification',
      icon: <BellOutlined />,
      href: '/notification',
    },
    {
      text: 'Schedule',
      icon: <CalendarOutlined />,
      href: '/schedule',
    },
    {
      text: 'Chat',
      icon: <MessageOutlined />,
      href: '/chat',
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
      text: 'Notification',
      icon: <BellOutlined />,
      href: '/notification',
    },
    {
      text: 'My Courses',
      icon: <RadarChartOutlined />,
      href: '/course',
    },
    {
      text: 'Schedule',
      icon: <CalendarOutlined />,
      href: '/schedule',
    },
    {
      text: 'Chat',
      icon: <MessageOutlined />,
      href: '/chat',
    },
  ],
};
