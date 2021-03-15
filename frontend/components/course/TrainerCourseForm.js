import { Form, Input, Select, Radio, InputNumber } from 'antd';
import useSWR from 'swr';
import axios from 'axios';

import { API_HOST } from '../../config/config';

const TrainerCourseForm = ({ form, initialFormValues, handleSubmit }) => {
  const { data: preferences } = useSWR(
    `${API_HOST}/preference`,
    async (url) => {
      const res = await axios.get(url);
      return res?.data ?? {};
    },
  );

  const initialValues = {
    ...initialFormValues,
    difficulty: initialFormValues?.level?.toLowerCase() ?? '',
    specialization: initialFormValues?.specialization?.toLowerCase() ?? '',
  };

  return (
    <div className="w-full">
      <Form
        id="course-form"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true, message: 'Title is required' }]}
          initialValue={initialValues.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Course Description"
          rules={[{ required: true, message: 'Description is required' }]}
          initialValue={initialValues.description}
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>

        <Form.Item
          label="Difficulty Level"
          name="difficulty"
          rules={[
            { required: true, message: 'Please select diffifulty level' },
          ]}
          initialValue={initialValues.difficulty}
        >
          <Radio.Group>
            <Radio.Button value="beginner">Beginner</Radio.Button>
            <Radio.Button value="intermediate">Intermediate</Radio.Button>
            <Radio.Button value="advance">Advance</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="specialization"
          label="Specialization"
          rules={[{ required: true, message: 'Please select specialization' }]}
          initialValue={initialValues.specialization}
        >
          <Select>
            {preferences &&
              preferences.map((preference) => (
                <Select.Option
                  key={preference.id}
                  value={preference.name.toLowerCase()}
                >
                  {preference.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="period"
          label="Training Period (hours)"
          rules={[
            {
              type: 'integer',
              message: 'Input must be an integer',
            },
            { required: true, message: 'Training Period is required' },
          ]}
          initialValue={initialValues.period}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price (bahts)"
          rules={[
            {
              type: 'integer',
              message: 'Input must be an integer',
            },
            { required: true, message: 'Price is required' },
          ]}
          initialValue={initialValues.price}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="province"
          label="Province"
          rules={[{ required: true, message: 'Province is required' }]}
          initialValue={initialValues.province}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          initialValue={initialValues.city}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TrainerCourseForm;
