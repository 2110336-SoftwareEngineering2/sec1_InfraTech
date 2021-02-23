import React from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
// import CustomUpload from '../CustomUpload';

const InformationProfile = ({ email, profile, setIsEditing }) => {
  
  const calculateAge = birthdate => {
    const date = new Date(birthdate)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const onClick = () => {
    setIsEditing(true)
  }

  return(
    <div className="flex justify-between w-4/5">
      <div className="mt-10 mr-12 w-2/5">
        {/* <Form.Item name="profileImageUrl" className="text-center">
        <CustomUpload />
        </Form.Item> */}
      </div>
      <div className="mt-12 w-3/5">
        <div className="text-2xl font-bold">{profile.firstname + ' ' + profile.lastname}</div>
        <div className="text-lg mt-8">Age: {calculateAge(profile.birthdate)} years old</div>
        <div className="text-lg mt-4">Gender: {profile.gender}</div>
        <div className="text-lg mt-4">Tel: {profile.phoneNumber}</div>
        <div className="text-lg mt-4">Email: {email} </div>
        <div className="text-lg mt-4">Expert: </div>
        <Button type="primary" size="large" className="w-24 mt-4" onClick={onClick}>Edit</Button>
      </div>
    </div>
  );
};

export default InformationProfile;