import React from 'react';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import { Modal } from 'antd';
import axios from 'axios';

import { COOKIE_NAME, API_HOST } from '../config/config';
import { REDIRECT_CONDITION } from '../config/RedirectCondition.config';
import useUser from '../lib/useUser';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

const Login = () => {
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectWhen: REDIRECT_CONDITION.USER_FOUND,
  });

  const handleSubmit = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${API_HOST}/login`, {
        email,
        password,
      });
      if (data?.token) {
        setCookie(COOKIE_NAME, data.token, {
          path: '/',
          maxAge: 1000000,
        });
        mutateUser();
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      Modal.error({
        title: 'Login Failed',
        content: 'Email/Password is incorrect.',
        centered: true,
      });
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
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
