import { CheckCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import Image from 'next/image';

const PreferrenceCard = ({ url, description, alt }) => {
  const [click, setClick] = useState(false);
  return (
    <div
      className={`w-60 h-60 relative flex flex-col justify-center items-between rounded-md pt-2 border-2 bg-white ${
        click ? ' border-blue' : 'border-black'
      }`}
      onClick={() => {
        setClick(!click);
      }}
    >
      {click && (
        <CheckCircleFilled className="absolute text-blue text-base top-3 right-3 z-10" />
      )}
      <div className="w-full h-48 relative rounded-md z-0 overflow-hidden">
        <Image layout="fill" alt={alt} src={url} />
      </div>
      <div className=" w-full h-12 relative flex rounded-md items-center justify-center font-bold text-xl ">
        {description}
      </div>
    </div>
  );
};
export default PreferrenceCard;
