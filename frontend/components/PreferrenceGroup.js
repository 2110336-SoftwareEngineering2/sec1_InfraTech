import PreferrenceCard from './PreferrenceCard';
import { useState } from 'react';
import { Form } from 'antd';

const PreferrenceGroup = ({ value = {} }) => {
  const [flag, setFlag] = useState([false, false, false, false]);
  const click = (num) => {
    const newValue = [...flag];
    newValue[num] = !flag[num];
    setFlag(newValue);
  };
  return (
    <div className="h-3/4 flex flex-row justify-between bg-white">
      <div className="flex flex-col ">
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={flag[0]}
          click={() => click(0)}
        />
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={flag[1]}
          click={() => click(1)}
        />
      </div>
      <div className="flex flex-col ">
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={flag[2]}
          click={() => click(2)}
        />
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={flag[3]}
          click={() => click(3)}
        />
      </div>
    </div>
  );
};

export default PreferrenceGroup;
