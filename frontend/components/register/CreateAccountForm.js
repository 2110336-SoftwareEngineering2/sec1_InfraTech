import React from 'react';
import { Button, Form, Input } from 'antd';

const CreateAccountForm = ({ getState, setState, size, current, next }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(values);
    setState('create-account', values);
    next();
  };
  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Create Account</div>
      <Form
        form={form}
        initialValues={getState('create-account', {})}
        onFinish={onContinue}
      >
        <Form.Item name="email">
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" hasFeedback>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="confirm" hasFeedback>
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccountForm;
