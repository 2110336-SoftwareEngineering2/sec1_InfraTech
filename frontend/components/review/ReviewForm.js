import { Form, Input, Rate } from 'antd';

const ReviewForm = ({ form, formId, handleSubmit }) => {
  return (
    <div className="w-full">
      <Form
        id={formId}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => handleSubmit(values)}
      >
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: 'Rating is required' }]}
        >
          <Rate allowClear={false} allowHalf></Rate>
        </Form.Item>
        <Form.Item name="comment" label="Review">
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
