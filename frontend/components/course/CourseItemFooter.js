import { List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

import { setAllFirstCapitalLetter } from '../../lib/setCapitalLetter';

const CourseItemFooter = ({ course }) => (
  <List.Item
    actions={[
      <IconText
        icon={<RadarChartOutlined />}
        text={setAllFirstCapitalLetter(course.specialization)}
      />,
      <IconText
        icon={<DashboardOutlined />}
        text={setAllFirstCapitalLetter(course.level)}
      />,
      <IconText
        icon={<ClockCircleOutlined />}
        text={`${course.period} days`}
      />,
      <IconText
        icon={<DollarCircleOutlined />}
        text={`${Math.trunc(course.price)} bahts`}
      />,
      <IconText
        icon={<EnvironmentOutlined />}
        text={`${
          course?.district
            ? setAllFirstCapitalLetter(course.district) + ','
            : ''
        } ${setAllFirstCapitalLetter(course.province)}`}
      />,
    ]}
  />
);

const IconText = ({ icon, text }) => (
  <Space className="text-gray-800">
    {icon}
    {text}
  </Space>
);

export default CourseItemFooter;
