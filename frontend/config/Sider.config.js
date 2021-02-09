import {
  SearchOutlined,
  BellOutlined,
  RadarChartOutlined,
  CalendarOutlined,
  MessageOutlined,
} from '@ant-design/icons';

export const MENU_ITEMS = {
  guest: [
    {
      text: 'Browse',
      icon: <SearchOutlined />,
    },
  ],
  trainer: [
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
  trainee: [
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