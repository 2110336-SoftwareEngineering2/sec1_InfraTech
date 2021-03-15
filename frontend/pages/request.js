import React, { useState } from 'react';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import TrainerCourseRequest from '../components/course/TrainerCourseRequest';
import Loading from '../components/common/Loading';

const Request = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen flex justify-center">
        <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
          <div className="text-4xl font-bold mb-10">
            Course Application Request
          </div>
          {user ? <TrainerCourseRequest /> : <Loading />}
        </div>
      </div>
    </AppLayout>
  );
};

export default Request;
