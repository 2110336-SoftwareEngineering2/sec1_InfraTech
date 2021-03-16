import { Button, List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  CheckSquareOutlined,
  SyncOutlined,
  CloseSquareOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { API_HOST, COOKIE_NAME } from '../../config/config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

// TODO: Implement onClick for register and cancel course
const TraineeApplicationItem = ({ app }) => {
  const [token] = useCookies([COOKIE_NAME]);
  console.log(app);
  const course = app.course;
  const renderSwitch = (mode) => {
    switch (mode) {
      case 'pending':
        return (
          <>
            Pending for approve
            <SyncOutlined className="m-2" />
          </>
        );
      case 'approve':
        return (
          <>
            Registered Course <CheckSquareOutlined className="m-2" />
          </>
        );
      case 'reject':
        return (
          <>
            Rejected Course Please cancel and register again
            <CloseSquareOutlined className="m-2" />
          </>
        );
      case 'complete':
        return (
          <>
            Complete Course <CrownOutlined className="m-2" />
          </>
        );
    }
  };

  const colorSwitch = (mode) => {
    switch (mode) {
      case 'approve':
        return 'indigo-100';
      case 'reject':
        return 'red-100';
      case 'complete':
        return 'green-100';
    }
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

  return (
    <div className={`bg-${colorSwitch(app.status)} p-6 shadow-around mb-4`}>
      <div
        className={`bg-${colorSwitch(app.status)} mb-6 flex justify-between`}
      >
        <div className=" mb-6 flex justify-start">
          <div className=" ml-3 text-blue font-bold text-xl">
            {course.title}
          </div>
          <div className=" ml-3 text-black font-bold text-xl">by trainer</div>
          <div className=" ml-3 text-red-500 font-bold text-xl">
            {course.trainer.firstname}
          </div>
        </div>
        <div className="text-lg text-gray-600">
          <>
            {renderSwitch(app.status)}
            <Button
              className="ml-6"
              type="primary"
              danger
              onClick={handleCancel}
            >
              cancel
            </Button>
          </>
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
