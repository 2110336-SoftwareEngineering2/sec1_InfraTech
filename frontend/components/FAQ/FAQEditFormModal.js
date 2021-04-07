import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form } from 'antd';
import axios from 'axios';

import FAQFormModal from './FAQFormModal';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const FAQEditFormModal = ({
  faqs,
  id,
  mutateFAQ,
  visible,
  setVisible,
  initialFormValues,
}) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleEdit = async (formValues) => {
    try {
      await form.validateFields();
      setSubmitLoading(true);
      const updateData = {
        ...formValues,
        id,
      };
      const res = await axios.put(`${API_HOST}/faq/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (res?.data) {
        mutateFAQ([...faqs.filter((faq) => faq.id !== id), res.data]);
      }
      setVisible(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
    return;
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <FAQFormModal
      form={form}
      formId={`edit-faq-form-${id}`}
      title="Edit FAQ"
      visible={visible}
      loading={submitLoading}
      initialFormValues={initialFormValues}
      handleSubmit={handleEdit}
      handleCancel={handleCancel}
    />
  );
};

export default FAQEditFormModal;
