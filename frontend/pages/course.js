import { AppLayout } from '../components/common';
import useUser from '../lib/useUser';

import TrainerCourseListInOtherview from '../components/courseInOtherview/TrainerCourseListInOtherview';
import Loading from '../components/common/Loading';
import { USER_TYPE } from '../config/UserType.config';

const Course = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/login' });

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      {user ? (
        <div className="min-h-screen flex justify-center">
          <div className="bg-white w-full mx-8 mt-8 py-12 px-24">
            <hr className="my-16" />
            <div className="text-4xl font-bold m-10">
              My Arleady Registed Courses
            </div>
            <TrainerCourseListInOtherview
              type={USER_TYPE.TRAINEE}
              filter="success"
              showTrainerName={true}
            />
            <div className="text-4xl font-bold m-10">
              Pending For Accept Courses
            </div>
            <TrainerCourseListInOtherview
              type={USER_TYPE.TRAINEE}
              filter="pending"
              showTrainerName={true}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default Course;
