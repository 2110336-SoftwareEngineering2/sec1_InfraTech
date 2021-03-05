import { useState } from 'react';
import { Modal, Button } from 'antd';

import TrainerCourseForm from './TrainerCourseForm';

const TrainerCourseEditModal = ({
  courseInfo,
  setCourseInfo,
  visible,
  setVisible,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Edit Course"
      visible={visible}
      centered={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="pt-8">
        <TrainerCourseForm
          courseInfo={courseInfo}
          showButton={false}
          handleSubmit={setCourseInfo}
        />
      </div>
    </Modal>
  );
};

export default TrainerCourseEditModal;
