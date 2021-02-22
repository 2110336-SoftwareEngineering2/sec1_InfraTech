import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Row, Select, Upload } from 'antd';
import Image from 'next/image';
import { UploadOutlined } from '@ant-design/icons';
import fire from './../../config/firebase';
import CustomUpload from '../CustomUpload';

const validateCitizenID = (id) => {
  // ref: https://snasui.com/wordpress/identification/

  if (!id || id === "") return Promise.resolve();
  if (!/^\d{13}$/.test(id)) return Promise.reject('Citizen ID must has only 13 digits.')

  // find sum of adjusted first 12 digits
  let sum = 0;
  for(let i=0; i<12; i++) {
    sum += parseInt(id.charAt(i), 10) * (13-i);
  }
    
  // evaluate check digit
  if (((11 - (sum % 11)) % 10).toString() === id.charAt(12)) {
    return Promise.resolve();
  }
  return Promise.reject('Check digit of citizen ID is incorrect.');
}

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
      <div className="text-3xl sm:text-4xl font-bold">Fill information</div>
      <Form
        form={form}
        initialValues={getState('information', {})}
        onFinish={onContinue}
      >
        <div className="flex justify-between">
          <div className="hidden md:block mt-0 lg:mt-10 mx-8">
            <Form.Item name="img" className="text-center mt-6">
              <CustomUpload />
            </Form.Item>
          </div>
          <div className="mt-12 ml-12 w-96">
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
            
            <Row justify="space-between">
              <Form.Item name="gender" className="w-32" hasFeedback rules={
                [{required: true, message: 'Gender is not specified'}]
              }>
                <Select placeholder="Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="dateOfBirth" className="w-60" hasFeedback rules={
                [
                  {required: true, message: 'Please select birth date.'}
                ]
              }>
                <DatePicker className="w-full" placeholder="Date of birth" format="DD/MM/YYYY" />
              </Form.Item>
            </Row>

            <Form.Item name="citizenId" hasFeedback rules={
              [
                {required: true, message: 'Citizen ID must be specified.'},
                {validator: (_, value) => validateCitizenID(value)},
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
          </div>
        </div>

        <Form.Item className="text-center mt-10">
          <Button onClick={onBack} className="w-24 mr-4">Back</Button>
          <Button type="primary" htmlType="submit" className="w-24 ml-4">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FillInformationForm;
