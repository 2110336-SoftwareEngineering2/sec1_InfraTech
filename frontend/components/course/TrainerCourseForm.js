import { Form, Input, Button, Select, Radio, InputNumber } from 'antd';

const TrainerCourseForm = () => {

  return (
    <div className="px-32 pt-16 pb-10 shadow-around mb-4 flex justify-center">
      <div className="w-full">
        <Form labelCol={{span: 6}} wrapperCol={{span:14}} layout="horizontal">
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Course Description"
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Input.TextArea showCount maxLength={150} />
          </Form.Item>

          <Form.Item
            label="Difficulty Level"
            name="difficulty"
            rules={[
              { required: true, message: 'Please select diffifulty level' },
            ]}
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
            rules={[
              { required: true, message: 'Please select specialization' },
            ]}
          >
            <Select>
              <Select.Option value="abs">Abs</Select.Option>
              <Select.Option value="cardio">Cardio</Select.Option>
              <Select.Option value="body-weight">Body Weight</Select.Option>
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
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 8,
            }}
          >
            <Button type="primary" htmlType="submit" className="mr-4">
              Submit
            </Button>
            <Button htmlType="button">Cancel</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TrainerCourseForm;
