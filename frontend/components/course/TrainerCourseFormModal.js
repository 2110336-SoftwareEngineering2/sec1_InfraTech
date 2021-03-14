import { Modal, Button } from 'antd';

import TrainerCourseForm from './TrainerCourseForm';

const TrainerCourseFormModal = ({
  form,
  title,
  initialFormValues,
  visible,
  loading,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      centered
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button form="course-form" key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="course-form"
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="pt-8">
        <TrainerCourseForm
          form={form}
          initialFormValues={initialFormValues}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default TrainerCourseFormModal;
