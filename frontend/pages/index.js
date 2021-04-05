import useUser from '../lib/useUser';
import Image from 'next/image';
import Router from 'next/router';
import { AppLayout } from '../components/common';
import { Button } from 'antd';

const Hero = () => {
  return (
    <div className="relative">
      <div>
        <Image
          src="/landing_hero.jpg"
          layout="responsive"
          width={760}
          height={324}
        />
      </div>
      <div className="absolute top-8 left-8">
        <div className="font-bold text-5xl mb-3">
          Find your best-fit workout training!
        </div>
        <div className="font-bold text-4xl text-gray-700 mb-6">at LetX</div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            Router.push('/register');
          }}
        >
          Register Now
        </Button>
      </div>
    </div>
  );
};

const Landing = () => {
  const { user = {}, mutateUser } = useUser({ redirectTo: '/' });
  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <Hero />
    </AppLayout>
  );
};

export default Landing;
