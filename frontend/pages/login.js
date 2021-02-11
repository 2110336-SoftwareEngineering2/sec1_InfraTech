import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import Footer from '../components/Footer';

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = data => console.log(data);

  return (
    <div>
      <div className="bg-gradient-blue-purple flex justify-center">
        <div className="bg-white p-8 my-40 rounded-lg flex justify-between">
          <Image src="/login.svg" width={240} height={300} />
          <div className="mx-12 mt-16 text-4xl font-bold">
            Welcome Back!
            <Form className="mt-6 w-80" layout={'vertical'} form={form} onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
              >
                <Input className="form-text-box" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password' },
                ]}
              >
                <Input
                  className="form-text-box password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
