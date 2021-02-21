import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';

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
        <Form.Item name="firstName" hasFeedback rules={
          [{required: true, message: 'Please provide first name.'}]
        }>
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item name="lastName" hasFeedback rules={
          [{required: true, message: 'Please provide last name.'}]
        }>
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item name="gender" hasFeedback rules={
          [{required: true, message: 'Gender is not specified'}]
        }>
          <Select placeholder="Gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="dateOfBirth" hasFeedback rules={
          [
            {type: 'date', message: 'Date format is incorrect.'},
            {required: true, message: 'Please select birth date.'}
          ]
        }>
          <DatePicker style={{ width: '100%' }} placeholder="Date of birth" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="citizenId" hasFeedback rules={
          [
            {required: true, message: 'Citizen ID must be specified.'},
            {validator: (_, value) => {
              // ref: https://snasui.com/wordpress/identification/

              if (!value || value === "") return Promise.resolve();
              if (!/^\d{13}$/.test(value)) return Promise.reject('Citizen ID must has only 13 digits.')

              // find sum of adjusted first 12 digits
              let sum = 0;
              for(let i=0; i<12; i++) {
                sum += parseInt(value.charAt(i), 10) * (13-i);
              }
                
              // evaluate check digit
              if (((11 - (sum % 11)) % 10).toString() === value.charAt(12)) {
                return Promise.resolve();
              }
              return Promise.reject('Check digit of citizen ID is incorrect.');
            }},
          ]
        }>
          <Input placeholder="Citizen ID" />
        </Form.Item>

        <Form.Item name="phoneNumber" hasFeedback rules={
          [
            {pattern: /^\d{9,10}$/, message: 'Phone number format is incorrect (9 - 10 digits).'},
            {required: true, message: 'Please provide phone number.'}
          ]
        }>
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
