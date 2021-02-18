import React from 'react';
import { Button } from 'antd';

// NOTE: draft version
const SelectRoleForm = ({ size, current, prev, next }) => {
  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Select Role</div>
      <Button onClick={prev}>Back</Button>
      <Button type="primary" onClick={next}>
        Continue
      </Button>
    </div>
  );
};

export default SelectRoleForm;
