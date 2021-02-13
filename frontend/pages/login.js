import React from 'react';
import { useCookies } from 'react-cookie'
import { Form } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

// TODO: Implement responsive handling
const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const [cookie, setCookie] = useCookies(["user"])

  // TODO: Connect to login API
  const handleSubmit = ({ email, password }) => {
    // console.log({ email, password });
    setCookie("user", email, {path: "/", maxAge: 3600})
    router.push('/')
  }

  return (
    <>
      <div className="bg-gradient-blue-purple flex justify-center">
        <div className="bg-white p-10 my-40 rounded-lg flex justify-between">
          <Image src="/login.svg" width={240} height={300} />
          <div className="mx-12 mt-16 text-4xl font-bold">
            Welcome Back!
            <LoginForm form={form} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
