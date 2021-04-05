import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import useUser from '../../lib/useUser';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { API_HOST, COOKIE_NAME } from '../../config/config';

import { AppLayout, Loading } from '../../components/common';
import { Button, Divider } from 'antd';
import TraineeViewCourseList from '../../components/course/TraineeViewCourseList';
import InformationProfile from '../../components/InformationProfile';

import { createRoom } from '../api/chat';

const TrainerProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const { data: trainer } = useSWR(`${API_HOST}/trainer/${id}`, (url) => {
    if (!id) return;
    else return axios.get(url).then((res) => res?.data ?? {});
  });

  const { data: courses } = useSWR(
    `${API_HOST}/course/trainer/${id}`,
    async (url) => {
      if (!id) return;
      else return axios.get(url).then((res) => res?.data ?? []);
    },
  );

  const [token] = useCookies([COOKIE_NAME]);
  const { data: applications } = useSWR(
    [`${API_HOST}/application`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      return res?.data ?? [];
    },
  );

  const coursesWithApp =
    !courses || !applications
      ? []
      : courses.map((course) => ({
          status:
            applications.find((app) => app.courseId === course.id)?.status ??
            'notApply',
          ...course,
        }));

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white w-full mx-8 mt-8 p-7">
            <div className="flex justify-between text-3xl font-bold mb-6">
              Trainer's Profile
              {trainer ? <Button onClick={() => createRoom(user.userId, id)}>Direct Message</Button> : <></>}
            </div>
            {trainer ? (
              <div>
                <InformationProfile profile={trainer} ownView={false} />
                <Divider />
                <div className="text-3xl font-bold mb-6">Trainer's Courses</div>
                <TraineeViewCourseList
                  courses={coursesWithApp}
                  showStatus={user.type === 'TRAINEE'}
                />
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default TrainerProfilePage;
