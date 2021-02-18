import React from 'react';
import { Button } from 'antd';

// NOTE: draft version
const FillInformationForm = ({ size, current, prev, next }) => {
  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Fill information</div>
      <Button onClick={prev}>Back</Button>
      <Button type="primary" onClick={next}>
        Submit
      </Button>
    </div>
  );
};

export default FillInformationForm;
