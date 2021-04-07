import { List } from 'antd';

import TraineeApplicationItem from './TraineeApplicationItem';

const TraineeApplicationList = ({ filter, app }) => {
  let altFilter = '';
  if (filter === 'complete') {
    altFilter = 'reviewed';
  }
  return (
    <List
      dataSource={
        filter && app != []
          ? app?.filter(
              (item) => item.status == filter || item.status == altFilter,
            )
          : courses
      }
      itemLayout="vertical"
      renderItem={(item) => <TraineeApplicationItem app={item} />}
    />
  );
};

export default TraineeApplicationList;
