import React from 'react';
import { Button, Form, Row } from 'antd';

import SelectRoleInput from '../SelectRoleInput';
import { USER_TYPE } from '../../config/UserType.config';

// NOTE: draft version
const SelectRoleForm = ({ getState, setState, size, current, prev, next }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(values);
    setState('select-role', values);
    next();
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    // TODO: remove console.log
    console.log(values);
    setState('select-role', values);
    prev();
  };

  return (
    <div className="w-full">
      <div>
        Step {current} of {size}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">Select Your Role</div>
      <Form
        form={form}
        initialValues={getState('select-role', { role: USER_TYPE.TRAINER })}
        onFinish={onContinue}
        size="large"
      >
        <Form.Item name="userType">
          <SelectRoleInput />
        </Form.Item>
        <Form.Item className="text-center">
          <Button onClick={onBack} className="w-24 mr-4">
            Back
          </Button>
          <Button type="primary" htmlType="submit" className="w-24 ml-4">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectRoleForm;
