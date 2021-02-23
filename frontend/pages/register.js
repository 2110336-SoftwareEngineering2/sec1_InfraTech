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
      <div className="bg-gradient-blue-purple lg:py-10">
        <div className="bg-white mx-auto w-full min-h-screen p-4 sm:p-6 md:p-8 xl:p-10 lg:w-800 lg:h-full lg:min-h-full">
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
