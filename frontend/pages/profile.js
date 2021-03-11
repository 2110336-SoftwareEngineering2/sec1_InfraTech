import React, { useState } from 'react';
import moment from 'moment';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import EditProfile from '../components/EditProfile';
import InformationProfile from '../components/InformationProfile';
import TrainerCourseList from '../components/course/TrainerCourseList';
import Loading from '../components/common/Loading';

const Profile = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const [isEditing, setIsEditing] = useState(false);

  if (user) {
    user.birthdate = moment(user.birthdate);
  }

  return (
    <AppLayout user={user} mutateUser={mutateUser} selectedMenu="2">
      {user ? (
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
            <div className="text-4xl font-bold mb-10">My Courses</div>
            <TrainerCourseList />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default Profile;
