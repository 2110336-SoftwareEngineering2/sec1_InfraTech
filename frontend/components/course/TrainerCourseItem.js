import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import TraineeListModal from './TraineeListModal';
import TrainerEditCourseFormModal from './TrainerEditCourseFormModal';

import { COOKIE_NAME, API_HOST } from '../../config/config';
const data = [
  {
    id: 1,
    name: 'Manny Pacquiao',
  },
  { id: 2, name: 'Manny John' },
  { id: 3, name: 'Manny Jake' },
];
const TrainerCourseItem = ({ course, courses, mutateCourse }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [showTraineeList, setShowTraineeList] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`${API_HOST}/course/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //   });
    //   mutateCourse([courses.filter((course) => course.id !== id)]);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
      <div className="p-6 shadow-around mb-4">
        <div className="mb-6 flex justify-between">
          <span className=" text-blue font-bold text-xl">{course.title}</span>
          <div className="text-lg text-gray-400">
            <UserOutlined
              className="ml-2 hover:text-black"
              onClick={() => setShowTraineeList(true)}
            />
            <EditOutlined
              className="ml-2 hover:text-black"
              onClick={() => setShowEditForm(true)}
            />
            <DeleteOutlined
              className="ml-2 hover:text-black"
              onClick={() => handleDelete(course.id)}
            />
          </div>
        </div>
        <div>{course.description}</div>
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
              text={`${course.city ? course.city + ',' : ''} ${
                course.province
              }`}
            />,
          ]}
        />
      </div>
      <TraineeListModal
        visible={showTraineeList}
        setVisible={setShowTraineeList}
      />
      <TrainerEditCourseFormModal
        courses={courses}
        id={course.id}
        trainerUserId={course.trainerUserId}
        mutateCourse={mutateCourse}
        visible={showEditForm}
        setVisible={setShowEditForm}
        initialFormValues={course}
      />
    </>
  );
};

const IconText = ({ icon, text }) => (
  <Space className="text-gray-800">
    {icon}
    {text}
  </Space>
);

export default TrainerCourseItem;
