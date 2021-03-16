import React, { useState, useEffect } from 'react';
import { Tag, Select } from 'antd';
import { API_HOST } from '../config/config';
import axios from 'axios';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainerSortBy, TrainerSortType } from '../config/FilterTrainer.config';

const { Option } = Select;

const FilterTrainerList = ({
  preferenceFilter,
  setPreferenceFilter,
  sortBy,
  setSortBy,
  sortType,
  setSortType,
}) => {
  const [preferenceOptions, setPreferenceOptions] = useState([]);

  const getPreferences = async () => {
    const res = await axios.get(`${API_HOST}/preference`);
    setPreferenceOptions(res.data);
  };

  useEffect(() => {
    getPreferences();
  }, []);

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  const handleSortType = (value) => {
    setSortType(value);
  };

  const handlePreferences = (value) => {
    if (preferenceFilter.includes(value)) {
      setPreferenceFilter(
        preferenceFilter.filter((perference) => perference != value),
      );
    } else {
      setPreferenceFilter([...preferenceFilter, value]);
    }
  };

  return (
    <div className="my-6">
      <div>
        <div className="text-lg">Select Your Workout Preferences</div>
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
            onClick={() => handlePreferences(preference.id)}
            className="text-lg rounded-xl p-2 my-4 cursor-pointer"
            key={preference.id}
          >
            {preference.name}
          </Tag>
        ))}
      </div>
      <div className="flex">
        <div>
          <div className="text-lg">Sort By</div>
          <Select
            defaultValue={sortBy}
            onChange={handleSortBy}
            className="w-64 text-lg my-4"
          >
            <Option value={TrainerSortBy.AverageRating}>Rating</Option>
            <Option value={TrainerSortBy.Fullname}>Full Name</Option>
          </Select>
        </div>
        <div className="ml-12">
          <div className="text-lg">Sort Order</div>
          <Select
            defaultValue={sortType}
            onChange={handleSortType}
            className="w-64 text-lg my-4"
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
