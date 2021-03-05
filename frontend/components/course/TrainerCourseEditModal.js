import { useState } from 'react';
import { Modal, Button } from 'antd';

const TrainerCourseEditModal = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false)
  };

  return (
    <Modal
      title="Edit Course"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
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
      <p>text</p>
    </Modal>
  );
};

export default TrainerCourseEditModal;
