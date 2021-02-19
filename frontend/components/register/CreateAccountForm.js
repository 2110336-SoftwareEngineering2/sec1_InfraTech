import React from 'react';
import { Button, Form, Input } from 'antd';
import { rule } from 'postcss';

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
        <Form.Item name="email" hasFeedback rules={
          [
            {type: 'email', message: 'Email format is incorrect'}, 
            {required: true, message: 'Please provide an email.'}
          ]
        }>
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" hasFeedback rules={
          [{required: true, message: 'Please specify password.'}]
        }>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="confirm" hasFeedback dependencies={['password']} rules={
          [
            {required: true, message: 'Please confirm your password.'}, 
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve();
                return Promise.reject('Password does not match.')
              }
            })
          ]
        }>
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
