import React from 'react';
import { Button, Form } from 'antd';

import StepHeader from './StepHeader';
import SelectRoleInput from '../registerInput/SelectRoleInput';
import { USER_TYPE } from '../../config/UserType.config';

const SelectRoleForm = ({ getState, setState, size, current, prev, next }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    setState('select-role', values);
    next();
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    setState('select-role', values);
    prev();
  };

  return (
    <>
      <StepHeader current={current} size={size} title="Select Your Role" />
      <Form
        form={form}
        initialValues={getState('select-role', { userType: USER_TYPE.TRAINER })}
        onFinish={onContinue}
      >
        <Form.Item name="userType">
          <SelectRoleInput />
        </Form.Item>
        <Form.Item className="text-center">
          <Button onClick={onBack} className="w-32 mr-6">
            Back
          </Button>
          <Button type="primary" htmlType="submit" className="w-32">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SelectRoleForm;
