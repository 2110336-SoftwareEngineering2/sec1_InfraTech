import { List } from 'antd';

import TraineeViewCourseItem from './TraineeViewCourseItem';

const TraineeApplicationList = ({ courses, showStatus }) => {
  return (
    <List
      dataSource={courses}
      itemLayout="vertical"
      renderItem={(item) => (
        <TraineeViewCourseItem course={item} showStatus={showStatus} />
      )}
    />
  );
};

export default TraineeApplicationList;
