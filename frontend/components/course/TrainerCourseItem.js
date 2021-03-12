import { useState } from 'react';
import { List, Space, Form } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

import TrainerCourseFormModal from './TrainerCourseFormModal';

// TODO: Implement onClick for edit and delete icon
const TrainerCourseItem = ({ course }) => {
  const [form] = Form.useForm();
  const [showEditForm, setShowEditForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (formValues) => {
    //TODO: Connect to edit course API
    try {
      await form.validateFields();
      setSubmitLoading(true);
      setTimeout(() => {
        setShowEditForm(false);
        setSubmitLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowEditForm(false);
    form.resetFields();
  };

  return (
    <>
      <div className="p-6 shadow-around mb-4">
        <div className="mb-6 flex justify-between">
          <span className=" text-blue font-bold text-xl">{course.title}</span>
          <div className="text-lg text-gray-400">
            <EditOutlined
              className="ml-2 hover:text-black"
              onClick={() => setShowEditForm(true)}
            />
            <DeleteOutlined className="ml-2 hover:text-black" />
          </div>
        </div>
        <div>{course.description}</div>
        <List.Item
          actions={[
            <IconText
              icon={<RadarChartOutlined />}
              text={course.specialization}
            />,
            <IconText icon={<DashboardOutlined />} text={course.level} />,
            <IconText
              icon={<ClockCircleOutlined />}
              text={`${course.period} days`}
            />,
            <IconText
              icon={<DollarCircleOutlined />}
              text={`${course.price} bahts`}
            />,
            <IconText
              icon={<EnvironmentOutlined />}
              text={`${course.city || ''} ${course.province}`}
            />,
          ]}
        />
      </div>
      <TrainerCourseFormModal
        form={form}
        title="Edit Course"
        visible={showEditForm}
        loading={submitLoading}
        initialFormValues={course}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
};

const IconText = ({ icon, text }) => (
  <Space className="text-gray-800">
    {icon}
    {text}
  </Space>
);

export default TrainerCourseItem;
