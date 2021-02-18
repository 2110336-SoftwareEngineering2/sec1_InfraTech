import React from 'react';
import { Button, Input } from 'antd';

// NOTE: draft version
const CreateAccountForm = ({ getState, handleChange, size, current, next }) => {
  return (
    <div>
      <div>
        Step {current} of {size}
      </div>
      <div>Create Account</div>
      <Input
        name="email"
        placeholder="Email"
        value={getState('email', '')}
        onChange={handleChange}
      />
      <Input
        name="password"
        placeholder="Password"
        value={getState('password', '')}
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        value={getState('confirmPassword', '')}
        onChange={handleChange}
      />
      <Button type="primary" onClick={next}>
        Continue
      </Button>
    </div>
  );
};

export default CreateAccountForm;
