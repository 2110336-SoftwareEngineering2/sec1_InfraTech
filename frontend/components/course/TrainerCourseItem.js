import { List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// TODO: Implement onClick for edit and delete icon
const TrainerCourseItem = ({ course }) => (
  <div className="p-6 shadow-around mb-4">
    <div className="mb-6 flex justify-between">
      <span className=" text-blue font-bold text-xl">{course.title}</span>
      <div className="text-lg text-gray-400">
        <EditOutlined className="ml-2 hover:text-black" />
        <DeleteOutlined className="ml-2 hover:text-black" />
      </div>
    </div>
    <div className="text-lg">{course.description}</div>
    <List.Item
      actions={[
        <IconText icon={<RadarChartOutlined />} text={course.specialize} />,
        <IconText icon={<DashboardOutlined />} text={course.level} />,
        <IconText
          icon={<ClockCircleOutlined />}
          text={`${course.period} days`}
        />,
        <IconText
          icon={<DollarCircleOutlined />}
          text={`${course.price} bahts`}
        />,
      ]}
    />
  </div>
);

const IconText = ({ icon, text }) => (
  <Space className="text-lg text-gray-800">
    {icon}
    {text}
  </Space>
);

export default TrainerCourseItem;
