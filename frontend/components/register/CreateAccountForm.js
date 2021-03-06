import React from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import StepHeader from './StepHeader';

const CreateAccountForm = ({ getState, setState, size, current, next }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    setState('create-account', values);
    next();
  };
  return (
    <div className="flex">
      <div className="w-2/5 mr-4 hidden lg:block">
        <Image
          src="/register.svg"
          width={350}
          height={450}
          layout="responsive"
        />
      </div>
      <div className="w-full lg:w-3/5">
        <StepHeader current={current} size={size} title="Create Account" />
        <Form
          form={form}
          initialValues={getState('create-account', {})}
          onFinish={onContinue}
        >
          <Form.Item
            name="email"
            hasFeedback
            rules={[
              { type: 'email', message: 'Email format is incorrect' },
              { required: true, message: 'Please provide an email.' },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[{ required: true, message: 'Please specify password.' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            hasFeedback
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value)
                    return Promise.resolve();
                  return Promise.reject('Password does not match.');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-32">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
