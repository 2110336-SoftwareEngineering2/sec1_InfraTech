import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import Loading from '../components/common/Loading';

const Landing = () => {
  const { user = {}, mutateUser } = useUser({ redirectTo: '/' });
  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <Loading />
    </AppLayout>
  );
};

export default Landing;
