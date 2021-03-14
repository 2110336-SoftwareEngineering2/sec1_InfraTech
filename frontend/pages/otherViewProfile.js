import React, { useState } from 'react';
import moment from 'moment';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import EditProfile from '../components/EditProfile';
import InformationProfile from '../components/InformationProfile';

import Loading from '../components/common/Loading';
import { USER_TYPE } from '../config/UserType.config';
import TrainerCourseListInOtherview from '../components/courseInOtherview/TrainerCourseListInOtherview';

const otherViewProfile = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const [isEditing, setIsEditing] = useState(false);

  if (user) {
    user.birthdate = moment(user.birthdate);
  }

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
            <InformationProfile
              profile={user}
              setIsEditing={setIsEditing}
              ownView={false}
            />
            <hr className="my-16" />
            <div className="text-4xl font-bold mb-10">Trainer's Courses</div>
            <TrainerCourseListInOtherview type={USER_TYPE.TRAINER} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default otherViewProfile;
