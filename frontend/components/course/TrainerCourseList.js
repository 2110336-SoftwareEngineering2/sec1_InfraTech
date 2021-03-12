import { useState } from 'react';
import { List, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TrainerCourseItem from './TrainerCourseItem';
import TrainerCourseFormModal from './TrainerCourseFormModal';

// TODO: Fetch data from api
const data = [
  {
    title: 'Mock Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    level: 'Beginner',
    period: 5,
    specialization: 'Balance',
    price: 2999,
  },
  {
    title: 'Mock Title 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    level: 'Intermediate',
    period: 10,
    specialization: 'Strength',
    price: 499,
  },
];

const TrainerCourseList = () => {
  const [form] = Form.useForm();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (formValues) => {
    //TODO: Connect to create course API
    try {
      await form.validateFields();
      setSubmitLoading(true);
      setTimeout(() => {
        setShowCreateForm(false);
        setSubmitLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    form.resetFields();
  };

  return (
    <List
      dataSource={data}
      itemLayout="vertical"
      renderItem={(item) => <TrainerCourseItem course={item} />}
    >
      <div
        className="shadow-around mb-4 bg-gray-100 h-20 text-3xl text-gray-500 flex justify-center items-center hover:bg-gray-200"
        // TODO: Implement adding new course on click
        onClick={() => setShowCreateForm(true)}
      >
        <PlusOutlined />
      </div>
      <TrainerCourseFormModal
        form={form}
        title="Create Course"
        visible={showCreateForm}
        loading={submitLoading}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </List>
  );
};

export default TrainerCourseList;
