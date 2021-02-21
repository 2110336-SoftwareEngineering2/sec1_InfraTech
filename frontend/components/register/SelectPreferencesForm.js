import React from 'react';
import { Button, Checkbox, Form } from 'antd';

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

  const preferenceOptions = [
    { label: 'Cardiovascular', value: 'cardiovascular' },
    { label: 'Balance', value: 'balance' },
    { label: 'Flexibility', value: 'flexibility' },
    { label: 'Strength', value: 'strength' },
  ];

  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Select Preferences</div>
      <Form
        form={form}
        initialValues={getState('select-preferences', { preferences: [] })}
        onFinish={onContinue}
      >
        <Form.Item name="preferences">
          <Checkbox.Group options={preferenceOptions} />
        </Form.Item>
        <Form.Item>
          <Button onClick={onBack}>Back</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectPreferencesForm;
