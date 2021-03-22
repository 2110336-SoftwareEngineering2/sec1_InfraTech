import { Button } from 'antd';
import { useCookies } from 'react-cookie';
import { SyncOutlined, CheckSquareOutlined } from '@ant-design/icons';
import axios from 'axios';

import CourseItemFooter from './CourseItemFooter';

import {
  setAllFirstCapitalLetter,
  setFirstCapitalLetter,
} from '../../lib/setCapitalLetter';
import { API_HOST, COOKIE_NAME } from '../../config/config';

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
        <span className=" text-blue font-bold text-xl">
          {setAllFirstCapitalLetter(course.title)}
        </span>
        <div className="text-lg text-gray-400">
          {showStatus && renderByStatus(course.status)}
        </div>
      </div>
      <div>{setFirstCapitalLetter(course.description)}</div>
      <CourseItemFooter course={course} />
    </div>
  );
};

export default TraineeApplicationItem;
