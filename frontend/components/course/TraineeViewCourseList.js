import { List } from 'antd';

import TraineeViewCourseItem from './TraineeViewCourseItem';

const TraineeApplicationList = ({ courses }) => {
  return (
    <List
      dataSource={courses}
      itemLayout="vertical"
      renderItem={(item) => <TraineeViewCourseItem app={item} />}
    />
  );
};

export default TraineeApplicationList;
