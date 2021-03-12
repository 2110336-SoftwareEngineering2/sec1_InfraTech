import { useState } from 'react';
import { Modal, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const data = [
  {
    id: 1,
    name: 'Manny Pacquiao',
  },
  { id: 2, name: 'Manny John' },
  { id: 3, name: 'Manny Jake' },
];

const TraineeListModal = ({ visible, setVisible }) => {
  const [traineeList, setTraineeList] = useState(data);

  const handleOk = () => {
    setVisible(false);
  };

  const onCheck = (id) => {
    setTraineeList(traineeList.filter((obj) => obj.id !== id));
  };
  const onUncheck = (id) => {
    setTraineeList(traineeList.filter((obj) => obj.id !== id));
  };
  return (
    <Modal
      title="Trainee List"
      visible={visible}
      centered
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      {traineeList.map((trainee) => (
        <div key={trainee.id} className="flex justify-between mb-2">
          {trainee.name}
          <div className="text-lg text-gray-400">
            <CheckOutlined
              className="ml-2 hover:text-green-800"
              onClick={() => onCheck(trainee.id)}
            />
            <CloseOutlined
              className="ml-2 hover:text-red-800"
              onClick={() => onUncheck(trainee.id)}
            />
          </div>
        </div>
      ))}
    </Modal>
  );
};

export default TraineeListModal;
