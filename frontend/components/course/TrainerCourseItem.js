import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { List, Space, Modal } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import TrainerEditCourseFormModal from './TrainerEditCourseFormModal';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const TrainerCourseItem = ({ course, courses, mutateCourse }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_HOST}/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      mutateCourse([courses.filter((course) => course.id !== id)]);
    } catch (err) {
      console.error(err);
    }
  };

  const setFirstCapitalLetter = (text = '') =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <>
      <div className="p-6 shadow-around mb-4">
        <div className="mb-6 flex justify-between">
          <span className=" text-blue font-bold text-xl">
            {setFirstCapitalLetter(course.title)}
          </span>
          <div className="text-lg text-gray-400">
            <EditOutlined
              className="ml-2 hover:text-black"
              onClick={() => setShowEditForm(true)}
            />
            <DeleteOutlined
              className="ml-2 hover:text-black"
              onClick={() =>
                Modal.confirm({
                  title: 'Confirmation',
                  content:
                    'Are you sure you want to delete this course? This action cannot be undone.',
                  centered: true,
                  onOk: () => handleDelete(course.id),
                })
              }
            />
          </div>
        </div>
        <div>{setFirstCapitalLetter(course.description)}</div>
        <List.Item
          actions={[
            <IconText
              icon={<RadarChartOutlined />}
              text={setFirstCapitalLetter(course.specialization)}
            />,
            <IconText
              icon={<DashboardOutlined />}
              text={setFirstCapitalLetter(course.level)}
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
                  ? setFirstCapitalLetter(course.district) + ','
                  : ''
              } ${setFirstCapitalLetter(course.province)}`}
            />,
          ]}
        />
      </div>
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
