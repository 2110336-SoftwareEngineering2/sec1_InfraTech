import { Button, List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  SyncOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import { API_HOST, COOKIE_NAME } from '../../config/config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const TraineeApplicationItem = ({ course, showStatus }) => {
  const [token] = useCookies([COOKIE_NAME]);

  const handleRegister = () => {
    axios.post(
      `${API_HOST}/application/${course.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  };

  const handleCancel = () => {
    axios.patch(
      `${API_HOST}/application/cancel/${course.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  };

  const renderByStatus = (status) => {
    switch (status) {
      case 'notApply':
        return (
          <Button type="primary" onClick={handleRegister}>
            register
          </Button>
        );
      case 'canceled':
        return (
          <Button type="primary" onClick={handleRegister}>
            register
          </Button>
        );
      case 'pending':
        return (
          <div>
            Pending for approve <SyncOutlined className="m-2" />
            <Button type="primary" danger onClick={handleCancel}>
              cancel
            </Button>
          </div>
        );
      case 'approved':
        return (
          <div>
            Registered Course <CheckSquareOutlined className="m-2" />
          </div>
        );
      default:
        return <div>{status}</div>;
    }
  };

  return (
    <div className="p-6 shadow-around mb-4">
      <div className="mb-6 flex justify-between">
        <span className=" text-blue font-bold text-xl">{course.title}</span>
        <div className="text-lg text-gray-400">
          {showStatus && renderByStatus(course.status)}
        </div>
      </div>
      <div className="text-lg">{course.description}</div>
      <List.Item
        actions={[
          <IconText
            icon={<RadarChartOutlined />}
            text={
              course?.specialization
                ? course.specialization.charAt(0).toUpperCase() +
                  course.specialization.slice(1)
                : ''
            }
          />,
          <IconText
            icon={<DashboardOutlined />}
            text={
              course?.level
                ? course.level.charAt(0).toUpperCase() + course.level.slice(1)
                : ''
            }
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
            text={`${course.city ? course.city + ',' : ''} ${course.province}`}
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
