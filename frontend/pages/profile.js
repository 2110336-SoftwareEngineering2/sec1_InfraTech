import React, { useState } from 'react';
import moment from 'moment';

import useUser from '../lib/useUser';
import AppLayout from '../components/AppLayout';
import EditProfile from '../components/EditProfile';
import InformationProfile from '../components/InformationProfile';
import TrainerCourseList from '../components/course/TrainerCourseList';

const Profile = () => {
  const { user = {}, mutateUser } = useUser({ redirectTo: '/login' });
  const [isEditing, setIsEditing] = useState(false);

  user.birthdate = moment(user.birthdate);

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen flex justify-center">
        <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
          <div className="text-4xl font-bold">
            {isEditing ? 'Edit Profile' : 'Profile'}
          </div>
          {isEditing ? (
            <EditProfile profile={user} setIsEditing={setIsEditing} />
          ) : (
            <InformationProfile profile={user} setIsEditing={setIsEditing} />
          )}
          <hr className="my-16" />
          <div className="text-4xl font-bold mb-10">
            My Courses
          </div>
          <TrainerCourseList />
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
