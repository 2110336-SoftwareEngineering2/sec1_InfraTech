import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
  Modal
} from 'antd';
import Image from 'next/image';
import { UploadOutlined } from '@ant-design/icons';
import fire from './../../config/firebase';
import CustomUpload from '../CustomUpload';
import moment from 'moment'
import axios from 'axios';

import { API_HOST } from '../../config/config';

const validateCitizenID = (id) => {
  // ref: https://snasui.com/wordpress/identification/

  if (!id || id === '') return Promise.resolve();
  if (!/^\d{13}$/.test(id))
    return Promise.reject('Citizen ID must has only 13 digits.');

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
};



// NOTE: draft version
const FillInformationForm = ({ getState, setState, size, current, prev }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) customUpload();
  }, [submit]);

  const handleSubmit = async (profile) => {
    try {
      const { data } = await axios.post(`${API_HOST}/register`, profile);
      console.log(data);
      Router.push('/login')
    } catch (error) {
      console.error('An unexpected error happened:', error);
      Modal.error({
        title: 'Register Failed',
        content: 'Please try again.',
        centered: true,
      });
    }
  };

  const customUpload = async () => {
    const profile = { 
      email: getState('create-account').email, 
      password: getState('create-account').password, 
      ...getState('select-role'), 
      ...getState('select-preferences'),
      ...getState('information'),
      birthdate: moment(getState('information').birthdate).format('YYYY-MM-DD')
    }
    if (!file) {
      handleSubmit(profile);
      return;
    }
   
    const storage = fire.storage();
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = await storage.ref();
    const imageName = Date.now().toString() + '_' + file.originFileObj.name; //a unique name for the image
    const imgFile = storageRef.child(`profileImage/${imageName}`);
    try {
      await imgFile.put(file.originFileObj, metadata).then(snapshot => snapshot.ref.getDownloadURL().then(imageUrl => {
        handleSubmit({...profile, profileImageUrl: imageUrl});
      }));
    } catch (e) {
      message.error("Error, can not upload file");
    }
  };

  const onContinue = (values) => {
    setState('information', values);
    setSubmit(true);
    
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
    <div className="w-full">
      <div>
        Step {current} of {size}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">
        Fill Your information
      </div>
      <Form
        form={form}
        initialValues={getState('information', {})}
        onFinish={onContinue}
        size="large"
      >
        <div className="flex justify-between">
          <div className="mt-10 mr-12 w-2/5">
            <Form.Item name="profileImageUrl" className="text-center">
              <CustomUpload setFile={setFile} />
            </Form.Item>
          </div>
          <div className="mt-12 w-3/5">
            <Form.Item
              name="firstname"
              hasFeedback
              rules={[
                { required: true, message: 'Please provide first name.' },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="lastname"
              hasFeedback
              rules={[{ required: true, message: 'Please provide last name.' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Row justify="space-between">
              <Form.Item
                name="gender"
                className="w-1/3"
                hasFeedback
                rules={[{ required: true, message: 'Gender is not specified' }]}
              >
                <Select placeholder="Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="birthdate"
                className="w-3/5"
                hasFeedback
                rules={[
                  { required: true, message: 'Please select birth date.' },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Date of birth"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Row>

            <Form.Item
              name="cid"
              hasFeedback
              rules={[
                { required: true, message: 'Citizen ID must be specified.' },
                { validator: (_, value) => validateCitizenID(value) },
              ]}
            >
              <Input placeholder="Citizen ID" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              hasFeedback
              rules={[
                {
                  pattern: /^\d{9,10}$/,
                  message: 'Phone number format is incorrect (9 - 10 digits).',
                },
                { required: true, message: 'Please provide phone number.' },
              ]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="text-center mt-10">
          <Button onClick={onBack} className="w-24 mr-4">
            Back
          </Button>
          <Button type="primary" htmlType="submit" className="w-24 ml-4">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FillInformationForm;

