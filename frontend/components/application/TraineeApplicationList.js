import { List } from 'antd';

import TraineeApplicationItem from './TraineeApplicationItem';

const TraineeApplicationList = ({ filter, app }) => {

  return (
    <List
      dataSource={(filter&&app!=[])? app?.filter((item) => item.status == filter) : courses}
      itemLayout="vertical"
      renderItem={(item) => (
        <TraineeApplicationItem 
          app={item}
        />
      )}
    />
  );
};

export default TraineeApplicationList;
