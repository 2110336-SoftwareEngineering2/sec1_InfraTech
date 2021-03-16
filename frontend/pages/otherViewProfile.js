import React from 'react';
import moment from 'moment';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';

import InformationProfile from '../components/InformationProfile';

import Loading from '../components/common/Loading';
import useSWR from 'swr';

const otherViewProfile = () => {
  //TODO:เชื่อม trainer_page กับ trainer ที่อยากได้้ แล้วเชื่อม api กับ /course/trainer/${trainer_page.id} เพื่อดึงเอาลิสคอรสที่เทรนเนอร์คนนั้นมี
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  if (user) {
    user.birthdate = moment(user.birthdate);
  }

  // const { data: courses } = useSWR(
  //   [`${API_HOST}/course/trainer/${trainer_page.id}`, token],
  //   async (url, token) => {
  //     if (!token[COOKIE_NAME]) return;

  //     const res = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     });
  //     return res?.data ?? {};
  //   },
  // );

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
            <div className="text-4xl font-bold mb-10">Trainer's Profile</div>
            {/* <InformationProfile profile={trainer_page} ownView={false} /> */}
            <hr className="my-16" />
            <div className="text-4xl font-bold mb-10">Trainer's Courses</div>
            {/* <TrainerCourseListInOtherview course={course} /> */}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default otherViewProfile;
