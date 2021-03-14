import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form } from 'antd';
import axios from 'axios';

import TrainerCourseFormModal from './TrainerCourseFormModal';

import { COOKIE_NAME, API_HOST } from '../../config/config';

const TrainerEditCourseFormModal = ({
  courses,
  id,
  trainerUserId,
  mutateCourse,
  visible,
  setVisible,
  initialFormValues,
}) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleEdit = async (formValues) => {
    console.log(formValues);
    console.log('edit');
    try {
      await form.validateFields();
      setSubmitLoading(true);
      // const updateData = {
      //   ...formValues,
      //   id,
      //   trainerUserId,
      // };
      // const res = await axios.put(`${API_HOST}/course/${id}`, updateData, {
      //   headers: {
      //     Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
      //     'Access-Control-Allow-Origin': '*',
      //   },
      // });
      // if (res?.data) {
      //   mutateCourse([
      //     ...courses.filter((course) => course.id !== id),
      //     res.data,
      //   ]);
      // }
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
    <TrainerCourseFormModal
      form={form}
      title="Edit Course"
      visible={visible}
      loading={submitLoading}
      initialFormValues={initialFormValues}
      handleSubmit={handleEdit}
      handleCancel={handleCancel}
    />
  );
};

export default TrainerEditCourseFormModal;
