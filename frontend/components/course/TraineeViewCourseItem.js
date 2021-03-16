import { Button, List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { API_HOST, COOKIE_NAME } from '../../config/config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// TODO: Implement onClick for register and cancel course
const TraineeApplicationItem = ({ course }) => {
  const [token] = useCookies([COOKIE_NAME]);

  const handleRegister = () => {
    axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  };

  return (
    <div className={`bg-${colorSwitch(app.status)} p-6 shadow-around mb-4`}>
      <div
        className={`bg-${colorSwitch(app.status)} mb-6 flex justify-between`}
      >
        <div className=" mb-6 flex justify-start">
          <div className=" ml-3 text-blue font-bold text-xl">
            {course.title}
          </div>
        </div>
        <div className="text-lg text-gray-600">
          {/* ดึง api /application/{courseId} หาว่า อยู่ในสถานะไหน ถ้าอยู่ในสถานะอื่นที่ไม่ใช่ cancel ให้ใช้ปุ่ม cancel ถ้าอยู่ในสถานะ cancel ให้ใช้ ปุ่ม register แต่ถ้าเป็น trainer ดูกันเองไม่ต้องมีปุ่มอะไรเลย*/}
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
};

const IconText = ({ icon, text }) => (
  <Space className="text-lg text-gray-800">
    {icon}
    {text}
  </Space>
);

export default TraineeApplicationItem;
