import React from 'react';
import { useCookies } from 'react-cookie';
import { Form } from 'antd';
import Image from 'next/image';
import axios from 'axios';

import { REDIRECT_CONDITION } from '../config/RedirectCondition.config';
import useUser from '../lib/useUser';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || 'letx_token'
const API_HOST = process.env.NEXT_PUBLIC_LETX_API_HOST || 'http://localhost:3001'

const Login = () => {
  const [form] = Form.useForm();
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectWhen: REDIRECT_CONDITION.USER_FOUND,
  });

  // TODO: Connect to login API
  const handleSubmit = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${API_HOST}/login`, {
        email,
        password,
      });
      if (data?.token) {
        setCookie(COOKIE_NAME, data.token, {
          path: '/',
          maxAge: 1000000, // around three days
        });
        mutateUser();
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
    }
  };

  return (
    <>
      <div className="bg-gradient-blue-purple flex justify-center items-center">
        <div className="bg-white h-80 md:h-96 lg:h-auto p-0 sm:p-10 my-40 mx-12 lg:mx-0 rounded-lg flex justify-between items-center">
          <div className="hidden md:block mt-0 lg:mt-8">
            <Image src="/login.svg" width={240} height={300} />
          </div>
          <div className="mx-8 md:mx-12 my-10 text-3xl sm:text-4xl font-bold">
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
