import React from 'react';

const StepHeader = ({ current, size, title }) => {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="lg:text-lg">
        Step {current} of {size}
      </div>
      <div className="font-bold text-3xl lg:text-4xl">{title}</div>
    </div>
  );
};

export default StepHeader;
