import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import useSWR from 'swr';
import useUser from '../../lib/useUser';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { API_HOST, COOKIE_NAME } from '../../config/config';

import { AppLayout, Loading } from '../../components/common';
import { Divider } from 'antd';
import TraineeViewCourseList from '../../components/course/TraineeViewCourseList';

const calculateAge = (birthdate) => {
  const date = new Date(birthdate);
  var ageDifMs = Date.now() - date.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const toTitleCase = (text) =>
  text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();

const Profile = ({ profile }) => {
  const {
    firstname,
    lastname,
    birthdate,
    gender,
    phoneNumber,
    profileImageUrl,
  } = profile;

  const age = calculateAge(moment(birthdate));

  return (
    <div className="flex">
      <Image
        src={profileImageUrl}
        width={200}
        height={200}
        className="rounded-full align-middle"
      />
      <div className="ml-12 text-base">
        <div className="text-2xl font-bold mb-4">{`${firstname} ${lastname}`}</div>
        <div className="mb-3">
          {toTitleCase(gender)}, {age} years old
        </div>
        <div className="mb-3">Tel: {phoneNumber}</div>
      </div>
    </div>
  );
};

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
            <div className="text-3xl font-bold mb-6">Trainer's Profile</div>
            {trainer ? (
              <div>
                <Profile profile={trainer} />
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
