import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR from 'swr';

import TrainerCourseItem from './TrainerCourseItem';
import TrainerCreateCourseFormModal from './TrainerCreateCourseFormModal';
import axios from 'axios';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const TrainerCourseList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [token] = useCookies([COOKIE_NAME]);
  const { data: courses, mutate: mutateCourse } = useSWR(
    [`${API_HOST}/course`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      return res?.data ?? {};
    },
  );

  return (
    <List
      dataSource={courses}
      itemLayout="vertical"
      renderItem={(course) => {
        if (courses)
          return (
            <TrainerCourseItem
              course={course}
              courses={courses}
              mutateCourse={mutateCourse}
            />
          );
      }}
    >
      <div
        className="shadow-around mb-4 bg-gray-100 h-20 text-3xl text-gray-500 flex justify-center items-center hover:bg-gray-200"
        onClick={() => setShowCreateForm(true)}
      >
        <PlusOutlined />
      </div>
      <TrainerCreateCourseFormModal
        courses={courses}
        mutateCourse={mutateCourse}
        visible={showCreateForm}
        setVisible={setShowCreateForm}
      />
    </List>
  );
};

export default TrainerCourseList;
