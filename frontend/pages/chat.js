import React, { useState, useEffect } from 'react';

import useUser from '../lib/useUser';
import { AppLayout } from '../components/common';
import TrainerListItem from '../components/TrainerListItem';
import FilterTrainerList from '../components/FilterTrainerList';
import { List } from 'antd';
import { TrainerSortBy, TrainerSortType } from '../config/FilterTrainer.config';
import { API_HOST } from '../config/config';
import axios from 'axios';

const Chat = () => {
  const { user, mutateUser } = useUser({});
  const [preferenceFilter, setPreferenceFilter] = useState([]);
  const [sortBy, setSortBy] = useState(TrainerSortBy.AverageRating);
  const [sortType, setSortType] = useState(TrainerSortType.Ascending);
  const [trainerList, setTrainerList] = useState([]);

  const getTrainerList = async () => {
    const res = await axios.post(`${API_HOST}/trainer/preferences`, {
      preferences: preferenceFilter,
      sortBy: sortBy,
      sortType: sortType,
    });
    setTrainerList(res.data);
  };

  useEffect(() => {
    user &&
      setPreferenceFilter(user.preferences.map((preference) => preference.id));
  }, [user]);

  useEffect(() => {
    getTrainerList();
  }, [preferenceFilter, sortBy, sortType]);

  return (
    <AppLayout user={user} mutateUser={mutateUser}>
      <div className="min-h-screen bg-white mx-8 mt-8 py-12 px-12">
        <div className="text-3xl font-bold">Browse your trainer</div>
        <div className="text-2xl font-bold my-6">Filter</div>
        <FilterTrainerList
          preferenceFilter={preferenceFilter}
          setPreferenceFilter={setPreferenceFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortType={sortType}
          setSortType={setSortType}
        />
        <div className="text-2xl font-bold">Trainer List</div>
        <List
          dataSource={trainerList}
          itemLayout="vertical"
          renderItem={(item) => <TrainerListItem trainer={item} />}
        />
      </div>
    </AppLayout>
  );
};

export default Chat;
