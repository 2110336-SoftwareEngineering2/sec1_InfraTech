import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Image from 'next/image';

import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

// TODO: Implement responsive handling
const Login = () => {
  const [form] = Form.useForm();

  // TODO: Connect to API
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="bg-gradient-blue-purple flex justify-center">
        <div className="bg-white p-10 my-40 rounded-lg flex justify-between">
          <Image src="/login.svg" width={240} height={300} />
          <div className="mx-12 mt-16 text-4xl font-bold">
            Welcome Back!
            <LoginForm form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
