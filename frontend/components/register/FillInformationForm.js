import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';

// NOTE: draft version
const FillInformationForm = ({ getState, setState, size, current, prev }) => {
  const [form] = Form.useForm();

  const onContinue = (values) => {
    setState('information', values);

    // TODO: remove console.log
    console.log('create-account', getState('create-account'));
    console.log('select-role', getState('select-role'));
    console.log('select-preferences', getState('select-preferences'));
    console.log('information', getState('information'));
  };

  const onBack = () => {
    const values = form.getFieldsValue();
    // TODO: remove console.log
    console.log(values);
    setState('information', values);
    prev();
  };
  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Fill information</div>
      <Form
        form={form}
        initialValues={getState('information', {})}
        onFinish={onContinue}
      >
        <Form.Item name="firstName">
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item name="lastName">
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item name="gender">
          <Select placeholder="Gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="dateOfBirth">
          <DatePicker placeholder="Date of birth" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="citizenId">
          <Input placeholder="Citizen ID" />
        </Form.Item>

        <Form.Item name="phoneNumber">
          <Input placeholder="Phone number" />
        </Form.Item>

        <Form.Item>
          <Button onClick={onBack}>Back</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FillInformationForm;
