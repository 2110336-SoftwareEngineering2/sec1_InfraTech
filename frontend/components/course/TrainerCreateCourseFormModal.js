import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form } from 'antd';
import axios from 'axios';

import TrainerCourseFormModal from './TrainerCourseFormModal';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const TrainerCreateCourseFormModal = ({
  courses,
  mutateCourse,
  visible,
  setVisible,
}) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleCreate = async (formValues) => {
    console.log('create');
    try {
      await form.validateFields();
      setSubmitLoading(true);
      // const res = await axios.post(`${API_HOST}/course`, formValues, {
      //   headers: {
      //     Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // });
      // if (res?.data) {
      //   mutateCourse([courses.concat(res.data)]);
      // }
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
    <TrainerCourseFormModal
      form={form}
      formId="create-form"
      title="Create Course"
      visible={visible}
      loading={submitLoading}
      handleSubmit={handleCreate}
      handleCancel={handleCancel}
    />
  );
};

export default TrainerCreateCourseFormModal;
