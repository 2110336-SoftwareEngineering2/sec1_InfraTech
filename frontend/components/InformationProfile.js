import React from 'react';
import { Button, Image } from 'antd';
import CustomUpload from './CustomUpload';

const InformationProfile = ({ profile, setIsEditing }) => {
  const calculateAge = (birthdate) => {
    const date = new Date(birthdate);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const onClick = () => {
    setIsEditing(true);
  };

  const expert = profile.preferences
    ? profile.preferences.map((preference) => preference.name).join(', ')
    : '';

  return (
    <div className="flex mt-10">
      <div className="mr-32 text-center">
        {ownView ? (
          <CustomUpload value={profile.profileImageUrl} disable={true} />
        ) : (
          <Image value={profile.profileImageUrl} />
        )}
      </div>
      <div className="w-3/5">
        <div className="text-xl font-bold">{`${profile.firstname} ${profile.lastname}`}</div>
        <div className="mt-5">
          Age: {calculateAge(profile.birthdate)} years old
        </div>
        <div className="mt-4">Gender: {profile.gender}</div>
        <div className="mt-4">Tel: {profile.phoneNumber}</div>
        <div className="mt-4">Email: {profile.email} </div>
        <div className="mt-4">Expert: {expert} </div>
        <Button
          type="primary"
          size="large"
          className="w-24 mt-4"
          onClick={onClick}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default InformationProfile;
