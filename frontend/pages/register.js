import React from 'react';
import { Steps, Step } from '../lib/step-form';
import {
  CreateAccountForm,
  SelectRoleForm,
  SelectPreferencesForm,
  FillInformationForm,
} from '../components/register';

import Footer from '../components/Footer';

const Register = () => {
  return (
    <>
      <div className="bg-gradient-blue-purple lg:pt-10">
        <div className="bg-white mx-auto w-full h-screen px-4 sm:px-6 xl:px-8 pt-10 md:p-10 lg:w-800 lg:h-full">
          <Steps>
            <Step component={CreateAccountForm} />
            <Step component={SelectRoleForm} />
            <Step component={SelectPreferencesForm} />
            <Step component={FillInformationForm} />
          </Steps>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
