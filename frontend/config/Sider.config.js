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
    },
    {
      text: 'Browse',
      icon: <SearchOutlined />,
    },
  ],
  [USER_TYPE.TRAINER]: [
    {
      text: 'Home',
      icon: <HomeOutlined />,
    },
    {
      text: 'Browse',
      icon: <SearchOutlined />,
    },
    {
      text: 'My Profile',
      icon: <UserOutlined />,
      href: '/profile',
    },
    {
      text: 'Notification',
      icon: <BellOutlined />,
    },
    {
      text: 'Schedule',
      icon: <CalendarOutlined />,
    },
    {
      text: 'Chat',
      icon: <MessageOutlined />,
    },
  ],
  [USER_TYPE.TRAINEE]: [
    {
      text: 'Home',
      icon: <HomeOutlined />,
    },
    {
      text: 'Browse',
      icon: <SearchOutlined />,
    },
    {
      text: 'Notification',
      icon: <BellOutlined />,
    },
    {
      text: 'My Courses',
      icon: <RadarChartOutlined />,
    },
    {
      text: 'Schedule',
      icon: <CalendarOutlined />,
    },
    {
      text: 'Chat',
      icon: <MessageOutlined />,
    },
  ],
};
