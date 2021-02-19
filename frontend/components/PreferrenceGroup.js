import PreferrenceCard from './PreferrenceCard';
import { useState } from 'react';

const PreferrenceGroup = () => {
  const [prop1, setProp1] = useState(false);
  const [prop2, setProp2] = useState(false);
  const [prop3, setProp3] = useState(false);
  const [prop4, setProp4] = useState(false);
  const click1 = () => {
    setProp1(!prop1);
  };
  const click2 = () => {
    setProp2(!prop2);
  };
  const click3 = () => {
    setProp3(!prop3);
  };
  const click4 = () => {
    setProp4(!prop4);
  };
  return (
    <div className="h-3/4 flex flex-row justify-between bg-white">
      <div className="flex flex-col ">
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={prop1}
          click={click1}
        />
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={prop2}
          click={click2}
        />
      </div>
      <div className="flex flex-col ">
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={prop3}
          click={click3}
        />
        <PreferrenceCard
          url="/a.jpg"
          description="success"
          flag={prop4}
          click={click4}
        />
      </div>
    </div>
  );
};

export default PreferrenceGroup;
