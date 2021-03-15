import React, { useState, useEffect } from 'react';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import TrainerListItem from '../components/TrainerListItem';
import FilterTrainerList from '../components/FilterTrainerList';
import { List } from 'antd';

const data = [
  {
    userId: 123,
    firstname: 'Kornnara',
    lastname: 'Deputsuma',
    profileImageUrl: '/information.svg',
    averageRating: 3,
    User: {
      id: 123,
      preferences: [
        {
          id: 123,
          name: 'strength',
        },
        {
          id: 124,
          name: 'flexibility',
        },
      ],
    },
  },
];

const Browse = () => {
  const { user, mutateUser } = useUser({});
  const [preferenceFilter, setPreferenceFilter] = useState();
  useEffect(() => {
    user &&
      setPreferenceFilter(user.preferences.map((preference) => preference.id));
  }, [user]);

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen bg-white mx-8 mt-8 py-12 px-12">
        <div className="text-3xl font-bold">Browse your trainer</div>
        <div className="text-2xl font-bold my-6">Filter</div>
        <FilterTrainerList preferenceFilter={preferenceFilter} />
        <div className="text-2xl font-bold">Trainer List</div>
        <List
          dataSource={data}
          itemLayout="vertical"
          renderItem={(item) => <TrainerListItem trainer={item} />}
        />
      </div>
    </AppLayout>
  );
};

export default Browse;
