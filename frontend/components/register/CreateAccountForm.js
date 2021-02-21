import React from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';

const CreateAccountForm = ({ getState, setState, size, current, next }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(values);
    setState('create-account', values);
    next();
  };
  return (
    <div className="flex justify-between">
      <div className="hidden md:block mt-0 lg:mt-8">
        <Image src="/register.svg" width={240} height={300} />
      </div>
      <div className="mx-8 md:mx-12">
      <div>
        Step {current} of {size}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">Create Account</div>
      <Form
        className="mt-6"
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
    </div>
  );
};

export default CreateAccountForm;
