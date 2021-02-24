import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Row, Select, Modal, message } from 'antd';
import CustomUpload from './CustomUpload';
import moment from 'moment';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import fire from '../config/firebase';

import { USER_TYPE } from '../config/UserType.config';
import { COOKIE_NAME, API_HOST } from '../config/config';

const validateCitizenID = (id) => {
  // ref: https://snasui.com/wordpress/identification/

  if (!id || id === "") return Promise.resolve();
  if (!/^\d{13}$/.test(id)) return Promise.reject('Citizen ID must has only 13 digits.')

  // find sum of adjusted first 12 digits
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i), 10) * (13 - i);
  }

  // evaluate check digit
  if (((11 - (sum % 11)) % 10).toString() === id.charAt(12)) {
    return Promise.resolve();
  }
  return Promise.reject('Check digit of citizen ID is incorrect.');
}

const EditProfile = ({ profile, setIsEditing }) => {
  const [form] = Form.useForm();
  const [token] = useCookies([COOKIE_NAME]);
  const [file, setFile] = useState(null);

  const customUpload = async (values) => {
    const storage = fire.storage();
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = await storage.ref();
    const imageName = Date.now().toString() + '_' + file.originFileObj.name; //a unique name for the image
    const imgFile = storageRef.child(`profileImage/${imageName}`);
    try {
      await imgFile.put(file.originFileObj, metadata).then(snapshot => snapshot.ref.getDownloadURL().then(imageUrl => {
        handleSubmit({ ...values, profileImageUrl: imageUrl });
      }));
    } catch (e) {
      message.error("Error, can not upload file");
    }
  };

  const handleSubmit = async (values) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
        'Access-Control-Allow-Origin': '*',
      },
    }
    try {
      const { data } = await axios.patch(`${API_HOST}/profile`, values, config);
      Router.reload('/profile');
    } catch (error) {
      console.error('An unexpected error happened:', error);
      Modal.error({
        title: 'Information Not Save',
        content: 'Please try again.',
        centered: true,
      });
    }
  };

  const onSave = (values) => {
    values.birthdate = moment(values.birthdate).format('YYYY-MM-DD')
    values.email = profile.email;
    values.preferences = profile.preferences;
    if (!file) {
      handleSubmit(values);
      return;
    }
    customUpload(values);
  }

  const onCancel = () => {
    setIsEditing(false);
  }

  return (
    <Form
      form={form}
      initialValues={profile}
      onFinish={onSave}
      size="large"
    >
      <div className="flex mt-10">
        <div className="mr-32">
          <Form.Item name="profileImageUrl" className="text-center">
            <CustomUpload setFile={setFile} />
          </Form.Item>
        </div>
        <div className="w-3/5">
          <div className="text-lg">First Name</div>
          <Form.Item name="firstname" hasFeedback rules={
            [{ required: true, message: 'Please provide first name.' }]
          }>
            <Input placeholder="First Name" />
          </Form.Item>
          <div className="text-lg">Last Name</div>
          <Form.Item name="lastname" hasFeedback rules={
            [{ required: true, message: 'Please provide last name.' }]
          }>
            <Input placeholder="Last Name" />
          </Form.Item>
          <div className="text-lg">Gender</div>
          <Form.Item name="gender" className="w-1/3" hasFeedback rules={
            [{ required: true, message: 'Gender is not specified' }]
          }>
            <Select placeholder="Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <div className="text-lg">Date of Birth</div>
          <Form.Item name="birthdate" className="w-3/5" hasFeedback rules={
            [
              { required: true, message: 'Please select birth date.' }
            ]
          }>
            <DatePicker className="w-full" placeholder="Date of birth" format="DD/MM/YYYY" />
          </Form.Item>
          {
            profile.type === USER_TYPE.TRAINER && <div className="text-lg">Citizen ID</div>
          }
          {
            profile.type === USER_TYPE.TRAINER &&
            <Form.Item name="cid" hasFeedback rules={
              [
                { required: true, message: 'Citizen ID must be specified.' },
                { validator: (_, value) => validateCitizenID(value) },
              ]
            }>
              <Input placeholder="Citizen ID" />
            </Form.Item>
          }
          <div className="text-lg">Phone Number</div>
          <Form.Item name="phoneNumber" hasFeedback rules={
            [
              { pattern: /^\d{9,10}$/, message: 'Phone number format is incorrect (9 - 10 digits).' },
              { required: true, message: 'Please provide phone number.' }
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