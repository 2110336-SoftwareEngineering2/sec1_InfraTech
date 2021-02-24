import React, { useEffect, useState } from 'react';
import SelectionCard from './SelectionCard';
import axios from 'axios';
import { API_HOST } from '../config/config';

const SelectPreferencesInput = ({ value = [], onChange }) => {

  const [preferenceOptions, setPreferenceOptions] = useState([]);

  const getPreferences = async () => {
    await axios.get(`${API_HOST}/preference`).then(({ data }) =>
      setPreferenceOptions(data.map((preference) =>
      ({
        imageUrl: preference.svgUrl,
        description: preference.name,
        value: preference.id
      })
      )))
  }

  useEffect(() => {
    getPreferences();
  }, [])

  const onClick = (selectedIndex) => {
    if (onChange) {
      onChange(
        preferenceOptions.filter((option, index) => {
          return (
            (index == selectedIndex && !value.includes(option.value)) ||
            (index != selectedIndex && value.includes(option.value))
          );
        }).map((option) => option.value),
      );
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center">
      {preferenceOptions.map((option, index) => (
        <div className="mx-6 mb-4 sm:mb-12" key={index} >
          <SelectionCard
            checked={value.includes(option.value)}
            imageUrl={option.imageUrl}
            description={option.description}
            onClick={() => onClick(index)}
            width={250}
            height={250}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectPreferencesInput;
