import { useState } from 'react';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TrainerCourseItem from './TrainerCourseItem';
import TrainerCourseForm from './TrainerCourseForm';

// TODO: Fetch data from api
const data = [
  {
    title: 'Mock Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    level: 'Beginner',
    period: 5,
    specialize: 'Abs',
    price: 2999,
  },
  {
    title: 'Mock Title 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    level: 'Intermediate',
    period: 10,
    specialize: 'Cardio',
    price: 499,
  },
];

const TrainerCourseList = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <List
      dataSource={data}
      itemLayout="vertical"
      renderItem={(item) => <TrainerCourseItem course={item} />}
    >
      {showForm && <TrainerCourseForm setShowForm={setShowForm}/>}
      <div
        className="shadow-around mb-4 bg-gray-100 h-20 text-3xl text-gray-500 flex justify-center items-center hover:bg-gray-200"
        // TODO: Implement adding new course on click
        onClick={() => setShowForm(true)}
      >
        <PlusOutlined />
      </div>
    </List>
  );
};

export default TrainerCourseList;
