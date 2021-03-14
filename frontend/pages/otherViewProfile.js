import React from 'react';
import moment from 'moment';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';

import InformationProfile from '../components/InformationProfile';

import Loading from '../components/common/Loading';
import { USER_TYPE } from '../config/UserType.config';
import TrainerCourseListInOtherview from '../components/courseInOtherview/TrainerCourseListInOtherview';

const otherViewProfile = () => {
  //TODO:แก้จากเป็น user ตัวเองเป็น user ของ trainer ที่ลิ้งตาม ID ของ trainer
  const { user, mutateUser } = useUser({ redirectTo: '/login' });

  if (user) {
    user.birthdate = moment(user.birthdate);
  }

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
            <div className="text-4xl font-bold mb-10">Trainer's Profile</div>
            <InformationProfile profile={user} ownView={false} />
            <hr className="my-16" />
            <div className="text-4xl font-bold mb-10">Trainer's Courses</div>
            <TrainerCourseListInOtherview
              type={user.type}
              showTrainerName={false}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default otherViewProfile;
