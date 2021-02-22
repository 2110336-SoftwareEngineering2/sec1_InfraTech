import React from 'react';
import { Button, Form, Row } from 'antd';

import SelectionCard from '../SelectionCard';
import { USER_TYPE } from '../../config/UserType.config';

const SelectRoleInput = ({ value , onChange }) => {
  const onClick = role => {
    if (onChange) {
      onChange(role);
    }
  }
  return (
    <Row gutter={6}>
      <SelectionCard checked={value==USER_TYPE.TRAINER} imageUrl="/trainer.svg" description="Trainer" onClick={() => onClick(USER_TYPE.TRAINER)}/>
      <SelectionCard checked={value==USER_TYPE.TRAINEE} imageUrl="/trainee.svg" description="Trainee" onClick={() => onClick(USER_TYPE.TRAINEE)}/>
    </Row>
  );
};

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
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">Select Role</div>
      <Form
        form={form}
        initialValues={getState('select-role', { role: USER_TYPE.TRAINER })}
        onFinish={onContinue}
      >
        <Form.Item name="role">
          <SelectRoleInput/>
        </Form.Item>
        <Form.Item className="text-center">
          <Button onClick={onBack} className="w-24 mr-4">Back</Button>
          <Button type="primary" htmlType="submit" className="w-24 ml-4">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectRoleForm;
