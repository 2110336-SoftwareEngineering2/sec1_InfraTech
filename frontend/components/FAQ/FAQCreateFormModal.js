import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form } from 'antd';
import axios from 'axios';

import FAQFormModal from './FAQFormModal';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const FAQCreateFormModal = ({ faqs, mutateFAQ, visible, setVisible }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleCreate = async (formValues) => {
    try {
      await form.validateFields();
      setSubmitLoading(true);
      const res = await axios.post(`${API_HOST}/faq`, formValues, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (res?.data) {
        mutateFAQ([faqs.concat(res.data)]);
      }
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
    <FAQFormModal
      form={form}
      formId="create-faq-form"
      title="Create FAQ"
      visible={visible}
      loading={submitLoading}
      handleSubmit={handleCreate}
      handleCancel={handleCancel}
    />
  );
};

export default FAQCreateFormModal;
