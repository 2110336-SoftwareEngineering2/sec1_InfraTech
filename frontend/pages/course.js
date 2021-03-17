import { AppLayout } from '../components/common';
import axios from 'axios';
import useUser from '../lib/useUser';
import { useCookies } from 'react-cookie';

import Loading from '../components/common/Loading';
import { USER_TYPE } from '../config/UserType.config';
import { API_HOST, COOKIE_NAME } from '../config/config';
import useSWR from 'swr';
import TraineeApplicationList from '../components/application/TraineeApplicationList';

const Course = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });
  const [token] = useCookies([COOKIE_NAME]);
  const { data: app } = useSWR(
    [`${API_HOST}/application`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      return res?.data ?? {};
    },
  );

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white text-5xl w-full mx-8 mt-8 py-12 px-24">
            My Course
            <hr className="my-16" />
            <div className="text-4xl font-bold m-10">
              My Already Approve Courses
            </div>
            <TraineeApplicationList filter="approved" app={app} />
            <hr className="my-10" />
            <div className="text-4xl font-bold m-10">
              Pending For Approve Courses
            </div>
            <TraineeApplicationList filter="pending" app={app} />
            <hr className="my-10" />
            <div className="text-4xl font-bold m-10">Complete Courses</div>
            <TraineeApplicationList
              className="bg-green-300"
              filter="complete"
              app={app}
            />
            <hr className="my-10" />
            <div className="text-4xl font-bold m-10">Rejected Courses</div>
            <TraineeApplicationList
              type={USER_TYPE.TRAINEE}
              filter="rejected"
              app={app}
            />
            <hr className="my-10" />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default Course;
