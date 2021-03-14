import { useState } from 'react';
import { List, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TrainerCourseItem from './TrainerCourseItem';
import TrainerCourseFormModal from './TrainerCourseFormModal';

const courses = [
  {
    title: 'Mock Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    level: 'beginner',
    period: 5,
    specialization: 'balance',
    price: 2999,
    city: 'Samyan',
    province: 'Bangkok',
  },
  {
    title: 'Mock Title 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    level: 'intermediate',
    period: 10,
    specialization: 'strength',
    price: 499,
    province: 'Lopburi',
  },
];

const TrainerCourseList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [token] = useCookies([COOKIE_NAME]);
  // const { data: courses, mutate: mutateCourse } = useSWR(
  //   [`${API_HOST}/course`, token],
  //   async (url, token) => {
  //     if (!token[COOKIE_NAME]) return;

  //     const res = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     });
  //     return res?.data ?? {};
  //   },
  // );

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
              // mutateCourse={mutateCourse}
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
        // mutateCourse={mutateCourse}
        visible={showCreateForm}
        setVisible={setShowCreateForm}
      />
    </List>
  );
};

export default TrainerCourseList;
