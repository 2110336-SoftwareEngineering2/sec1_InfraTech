import { Modal, Button } from 'antd';

import FAQForm from './FAQForm';

const FAQFormModal = ({
  form,
  formId,
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
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button form={formId} key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form={formId}
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="pt-8">
        <FAQForm
          form={form}
          formId={formId}
          initialFormValues={initialFormValues}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default FAQFormModal;
