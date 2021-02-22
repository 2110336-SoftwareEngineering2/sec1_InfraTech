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
      <div className="bg-gradient-blue-purple flex justify-center items-center">
        <div className="bg-white w-1/2 pl-12 pr-20 pt-14 pb-16 rounded-lg flex justify-between m-12">
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
