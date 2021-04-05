import useUser from '../lib/useUser';
import Image from 'next/image';
import Router from 'next/router';
import { AppLayout } from '../components/common';
import { Button } from 'antd';

const Hero = () => {
  return (
    <div className="relative mb-8">
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
        <div className="font-bold text-4xl text-gray-500 mb-6">at LetX</div>
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

const Trainer = () => {
  return (
    <div className="flex align-middle p-10">
      <div className="w-1/3">
        <Image
          src="/trainer.png"
          layout="responsive"
          width={668}
          height={374}
        />
      </div>
      <div className="w-1/2 ml-16">
        <div className="font-bold text-4xl mb-8">
          Create your own training courses
        </div>
        <div className="text-2xl mb-10">
          You can create and design your workout training courses to suit your
          trainees, expertise, time, experiences, goals, and furthermore!
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            Router.push('/register');
          }}
        >
          Register as a trainer
        </Button>
      </div>
    </div>
  );
};

const Trainee = () => {
  return (
    <div className="flex justify-end p-10 bg-white">
      <div className="w-1/2 mr-16">
        <div className="font-bold text-4xl mb-8">
          Find your right workout training courses for FREE!
        </div>
        <div className="text-2xl mb-10">
          You can find training courses to suit your workout preferences,
          budgets, and trainers!
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            Router.push('/register');
          }}
        >
          Register as a trainee
        </Button>
      </div>
      <div className="w-1/3">
        <Image
          src="/trainee.png"
          layout="responsive"
          width={604}
          height={413}
        />
      </div>
    </div>
  );
};

const Landing = () => {
  const { user = {}, mutateUser } = useUser({ redirectTo: '/' });
  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <Hero />
      <Trainer />
      <Trainee />
    </AppLayout>
  );
};

export default Landing;
