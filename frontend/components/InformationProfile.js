import React from 'react';
import { Image, Tag } from 'antd';
import CustomUpload from './CustomUpload';
import { USER_TYPE } from '../config/UserType.config';

const InformationProfile = ({ profile, ownView }) => {
  const calculateAge = (birthdate) => {
    const date = new Date(birthdate);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="flex mt-10">
      <div className="mr-16 text-center">
        {ownView ? (
          <CustomUpload value={profile.profileImageUrl} disable={true} />
        ) : (
          <Image src={profile.profileImageUrl} />
        )}
      </div>
      <div className="w-3/5 text-lg mt-2">
        <div className="text-2xl font-bold">{`${profile.firstname} ${profile.lastname}`}</div>
        <div className="mt-5">
          {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
          {', '}
          {calculateAge(profile.birthdate)} years old
        </div>
        <div className="mt-4 flex ">
          {profile.type === USER_TYPE.TRAINER ? 'Expert in ' : 'Interested in '}
          {profile.preferences &&
            profile.preferences.map((preference) => (
              <Tag className="mx-2">{preference.name}</Tag>
            ))}
        </div>
        {profile.type === USER_TYPE.TRAINER && (
          <div className="mt-4">Tel: {profile.phoneNumber}</div>
        )}
        {profile.type === USER_TYPE.TRAINER && (
          <div className="mt-4">Email: {profile.email} </div>
        )}
      </div>
    </div>
  );
};

export default InformationProfile;
