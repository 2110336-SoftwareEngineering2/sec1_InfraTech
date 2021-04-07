import React, { useEffect, useState } from 'react';
import moment from 'moment';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import EditProfile from '../components/EditProfile';
import InformationProfile from '../components/InformationProfile';
import TrainerCourseList from '../components/course/TrainerCourseList';
import Loading from '../components/common/Loading';
import { USER_TYPE } from '../config/UserType.config';
import { EditOutlined } from '@ant-design/icons';
import FAQ from '../components/FAQ/FAQ';
import ReviewList from '../components/review/ReviewList';
import useSWR from 'swr';
import { API_HOST, COOKIE_NAME } from '../config/config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Profile = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const [isEditing, setIsEditing] = useState(false);
  const [token] = useCookies([COOKIE_NAME]);
  const { data: faqs, mutate: mutateFAQ } = useSWR(
    [`${API_HOST}/faq`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;
      if (user.type === USER_TYPE.TRAINEE) return;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      return res?.data ?? {};
    },
  );

  const { data: reviews } = useSWR(
    `${API_HOST}/review/${user?.userId}`,
    (url) => {
      if (!user) return;
      else return axios.get(url).then((res) => res?.data ?? {});
    },
  );

  const onClick = () => {
    setIsEditing(true);
  };

  if (user) {
    user.birthdate = moment(user.birthdate);
  }
  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
            <div className="text-3xl font-bold flex">
              {isEditing ? 'Edit Profile' : 'Profile'}
              {!isEditing && (
                <EditOutlined onClick={onClick} className="mx-4" />
              )}
            </div>
            {isEditing ? (
              <EditProfile profile={user} setIsEditing={setIsEditing} />
            ) : (
              <InformationProfile profile={user} ownView={true} />
            )}
            {user.type === USER_TYPE.TRAINER && (
              <>
                <hr className="my-16" />
                <div className="text-3xl font-bold mb-10">My Courses</div>
                <TrainerCourseList />
                <hr className="my-16" />
                <div className="text-3xl font-bold mb-6">My FAQ</div>
                <FAQ faqs={faqs} mutateFAQ={mutateFAQ} canEdit={true} />
                <hr className="my-16" />
                <div className="text-3xl font-bold mb-10">My Reviews</div>
                <ReviewList reviews={reviews} />
              </>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default Profile;
