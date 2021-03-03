import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';

const Landing = () => {
  const { user = {}, mutateUser } = useUser({ redirectTo: '/' });
  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen flex justify-center pt-40 font-bold text-4xl">
        Content
      </div>
    </AppLayout>
  );
};

export default Landing;
