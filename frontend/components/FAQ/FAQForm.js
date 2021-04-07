import { Form, Input } from 'antd';

const FAQForm = ({ form, formId, initialFormValues, handleSubmit }) => {
  const initialValues = {
    ...initialFormValues,
  };

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
          name="question"
          label="Question"
          rules={[{ required: true, message: 'Question is required' }]}
          initialValue={initialValues.question}
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>

        <Form.Item
          name="answer"
          label="Answer"
          rules={[{ required: true, message: 'Answer is required' }]}
          initialValue={initialValues.answer}
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FAQForm;
