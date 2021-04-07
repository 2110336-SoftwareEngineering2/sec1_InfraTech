import React from 'react';
import { Button, Form } from 'antd';
import SelectPreferencesInput from '../registerInput/SelectPreferencesInput';
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
    setState('select-preferences', values);
    next();
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    setState('select-preferences', values);
    prev();
  };

  return (
    <>
      <StepHeader
        current={current}
        size={size}
        title="Select Your Workout Preferences"
      />
      <Form
        form={form}
        initialValues={getState('select-preferences', { preferences: [] })}
        onFinish={onContinue}
      >
        <Form.Item name="preferences">
          <SelectPreferencesInput />
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

export default SelectPreferencesForm;
