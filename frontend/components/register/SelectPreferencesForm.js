import React, { useState } from 'react';
import { Button, Checkbox, Form, Row, Col } from 'antd';
import SelectPreferencesInput from '../SelectPreferencesInput';
import StepHeader from './StepHeader';

const SelectPreferencesForm = ({
  getState,
  setState,
  size,
  current,
  prev,
  next,
}) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    // TODO: remove console.log
    console.log(values);
    setState('select-preferences', values);
    next();
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    // TODO: remove console.log
    console.log(values);
    setState('select-preferences', values);
    prev();
  };

  return (
    <div className="w-full">
      <StepHeader
        current={current}
        size={size}
        title="Select Your Workout Preferences"
      />
      <Form
        form={form}
        initialValues={getState('select-preferences', { preferences: [] })}
        onFinish={onContinue}
        size="large"
        className="border-black"
      >
        <Form.Item name="preferences">
          <SelectPreferencesInput />
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

export default SelectPreferencesForm;
