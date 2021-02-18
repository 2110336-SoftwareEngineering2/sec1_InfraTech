import React from 'react';
import { Button } from 'antd';

// NOTE: draft version
const SelectPreferencesForm = ({ size, current, prev, next }) => {
  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Select Preferences</div>
      <Button onClick={prev}>Back</Button>
      <Button type="primary" onClick={next}>
        Continue
      </Button>
    </div>
  );
};

export default SelectPreferencesForm;
