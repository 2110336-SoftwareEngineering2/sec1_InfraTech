import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form, Modal, Button } from 'antd';
import axios from 'axios';

import ReviewForm from './ReviewForm';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const ReviewFormModal = ({ applicationId, visible, setVisible }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (formValues) => {
    try {
      await form.validateFields();
      setSubmitLoading(true);
      const res = await axios.post(
        `${API_HOST}/review`,
        { ...formValues, applicationId: applicationId },
        {
          headers: {
            Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      setVisible(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(false);
      form.resetFields();
    }
    return;
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Review Trainer"
      visible={visible}
      centered
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button
          form={`review-form-${applicationId}`}
          key="cancel"
          onClick={handleCancel}
        >
          Cancel
        </Button>,
        <Button
          form={`review-form-${applicationId}`}
          key="submit"
          type="primary"
          htmlType="submit"
          loading={submitLoading}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="pt-8">
        <ReviewForm
          form={form}
          formId={`review-form-${applicationId}`}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default ReviewFormModal;
