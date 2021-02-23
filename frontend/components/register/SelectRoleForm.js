import React from 'react';
import { Button, Form, Row } from 'antd';

import StepHeader from './StepHeader';
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
      <StepHeader current={current} size={size} title="Select Your Role" />
      <Form
        form={form}
        initialValues={getState('select-role', { role: USER_TYPE.TRAINER })}
        onFinish={onContinue}
        size="large"
      >
        <Form.Item name="role">
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
