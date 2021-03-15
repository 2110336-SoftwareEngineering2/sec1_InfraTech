import React, { useState, useEffect } from 'react';
import { Tag, Select } from 'antd';
import { API_HOST } from '../config/config';
import axios from 'axios';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainerSortBy, TrainerSortType } from '../config/FilterTrainer.config';

const { Option } = Select;

const FilterTrainerList = ({ preferenceFilter }) => {
  const [preferenceOptions, setPreferenceOptions] = useState([]);

  const getPreferences = async () => {
    await axios
      .get(`${API_HOST}/preference`)
      .then(({ data }) => setPreferenceOptions(data));
  };

  useEffect(() => {
    getPreferences();
  }, []);

  return (
    <div className="my-6">
      <div>
        <div className="text-xl">Select Your Workout Preferences</div>
        {preferenceOptions.map((preference) => (
          <Tag
            icon={
              preferenceFilter.includes(preference.id) ? (
                <CheckOutlined />
              ) : (
                <PlusOutlined />
              )
            }
            color={preferenceFilter.includes(preference.id) && 'blue'}
            className="text-xl rounded-xl p-2 my-4"
          >
            {preference.name}
          </Tag>
        ))}
      </div>
      <div className="flex">
        <div>
          <div className="text-xl">Sort By</div>
          <Select
            defaultValue={TrainerSortBy.AverageRating}
            className="w-64 text-xl my-4"
          >
            <Option value={TrainerSortBy.Fullname}>Full Name</Option>
            <Option value={TrainerSortBy.AverageRating}>Rating</Option>
          </Select>
        </div>
        <div className="ml-12">
          <div className="text-xl">Sort Order</div>
          <Select
            defaultValue={TrainerSortType.Ascending}
            className="w-64 text-xl my-4"
          >
            <Option value={TrainerSortType.Ascending}>Ascending</Option>
            <Option value={TrainerSortType.Descending}>Descending</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterTrainerList;
