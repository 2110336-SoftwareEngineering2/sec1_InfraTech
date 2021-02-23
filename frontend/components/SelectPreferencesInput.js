import SelectionCard from './SelectionCard';
import { PREFERENCE_OPTIONS } from '../config/PreferenceOptions.config';

const SelectPreferencesInput = ({ value = [], onChange }) => {
  const onClick = (selectedIndex) => {
    if (onChange) {
      onChange(
        PREFERENCE_OPTIONS.filter((option, index) => {
          return (
            (index == selectedIndex && !value.includes(option.value)) ||
            (index != selectedIndex && value.includes(option.value))
          );
        }).map((option) => option.value),
      );
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-around item-center">
      {PREFERENCE_OPTIONS.map((option, index) => (
        <SelectionCard
          checked={value.includes(option.value)}
          imageUrl={option.imageUrl}
          description={option.description}
          onClick={() => onClick(index)}
          key={option.value}
        />
      ))}
    </div>
  );
};

export default SelectPreferencesInput;
