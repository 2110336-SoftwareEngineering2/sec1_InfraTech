import React from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import CustomUpload from './CustomUpload';

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

const EditProfile = ({ profile, setIsEditing }) => {
  
  const [form] = Form.useForm();
  
  const onSave = (value) => {
    console.log(value.birthdate);
  }
  
  const onCancel = () => {
    setIsEditing(false);
  }
  
  return(
    <Form
      form={form}
      initialValues={profile}
      onFinish={onSave}
      size="large"
    >
      <div className="flex mt-10">
        <div className="mr-32">
          <Form.Item name="profileImageUrl" className="text-center">
            <CustomUpload />
          </Form.Item>
        </div>
        <div className="w-3/5">
          <div className="text-lg">First Name</div>
          <Form.Item name="firstname" hasFeedback rules={
            [{required: true, message: 'Please provide first name.'}]
          }>
            <Input placeholder="First Name" />
          </Form.Item>
          <div className="text-lg">Last Name</div>
          <Form.Item name="lastname" hasFeedback rules={
            [{required: true, message: 'Please provide last name.'}]
          }>
            <Input placeholder="Last Name" />
          </Form.Item>
          <div className="text-lg">Gender</div>
          <Form.Item name="gender" className="w-1/3" hasFeedback rules={
            [{required: true, message: 'Gender is not specified'}]
          }>
            <Select placeholder="Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <div className="text-lg">Date of Birth</div>
          <Form.Item name="birthdate" className="w-3/5" hasFeedback rules={
            [
              {required: true, message: 'Please select birth date.'}
            ]
          }>
            <DatePicker className="w-full" placeholder="Date of birth" format="DD/MM/YYYY" />
          </Form.Item>
          <div className="text-lg">Citizen ID</div>
          <Form.Item name="cid" hasFeedback rules={
            [
              {required: true, message: 'Citizen ID must be specified.'},
              {validator: (_, value) => validateCitizenID(value)},
            ]
          }>
            <Input placeholder="Citizen ID" />
          </Form.Item>
          <div className="text-lg">Phone Number</div>
          <Form.Item name="phoneNumber" hasFeedback rules={
            [
              {pattern: /^\d{9,10}$/, message: 'Phone number format is incorrect (9 - 10 digits).'},
              {required: true, message: 'Please provide phone number.'}
            ]
          }>
            <Input placeholder="Phone number" />
          </Form.Item>
          <Form.Item className="mt-10">
            <Button onClick={onCancel} className="w-24 mr-4">Cancel</Button>
            <Button type="primary" htmlType="submit" className="w-24 ml-4">
              Save
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditProfile;