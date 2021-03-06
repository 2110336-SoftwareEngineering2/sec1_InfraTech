import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import useUser from '../../lib/useUser';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { API_HOST, COOKIE_NAME } from '../../config/config';

import { AppLayout, Loading } from '../../components/common';
import { Divider } from 'antd';
import TraineeViewCourseList from '../../components/course/TraineeViewCourseList';
import InformationProfile from '../../components/profile/InformationProfile';
import FAQ from '../../components/FAQ/FAQ';
import ReviewList from '../../components/review/ReviewList';

import { USER_TYPE } from '../../config/UserType.config';
import DirectMessageButton from '../../components/chat/DirectMessageButton';

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

  const { data: faqs, mutate: mutateFAQ } = useSWR(
    `${API_HOST}/faq/trainer/${id}`,
    async (url) => {
      if (!id) return;
      else return axios.get(url).then((res) => res?.data ?? []);
    },
  );

  const { data: reviews } = useSWR(`${API_HOST}/review/${id}`, (url) => {
    if (!id) return;
    else return axios.get(url).then((res) => res?.data ?? {});
  });

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
              {trainer && user?.type === USER_TYPE.TRAINEE ? (
                <DirectMessageButton trainer={trainer}/>
              ) : (
                <></>
              )}
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
                <hr className="my-16" />
                <div className="text-3xl font-bold mb-6">Trainer's FAQ</div>
                <FAQ
                  faqs={faqs}
                  mutateFAQ={mutateFAQ}
                  canEdit={id == user.userId}
                />
                <hr className="my-16" />
                <div className="text-3xl font-bold mb-6">Trainer's Reviews</div>
                <ReviewList reviews={reviews} />
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
