import { useState } from 'react';
import { List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TrainerCourseItemInOtherview from './TrainerCourseItemInOtherview';

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
    status: 'noregisted',
  },
  {
    title: 'Mock Title 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    level: 'Intermediate',
    period: 10,
    specialize: 'Cardio',
    price: 499,
    status: 'accepted',
  },
  {
    title: 'Mock Title 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    level: 'Intermediate',
    period: 10,
    specialize: 'Cardio',
    price: 499,
    status: 'registed',
  },
];

const TrainerCourseListInOtherview = ({ type }) => {
  return (
    <List
      dataSource={data}
      itemLayout="vertical"
      renderItem={(item) => (
        <TrainerCourseItemInOtherview course={item} type={type} />
      )}
    />
  );
};

export default TrainerCourseListInOtherview;
