import { CheckCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import Image from 'next/image';

const PreferrenceCard = ({ url, description, alt }) => {
  const [click, setClick] = useState(false);
  return (
    <div
      className={`w-60 h-72 items-between rounded-md border-2 border-black-500 relative ${
        click ? 'ring-4 ring-indigo-300' : ''
      }`}
      onClick={() => {
        setClick(!click);
      }}
    >
      {click && (
        <CheckCircleFilled className="absolute text-blue text-base top-3 right-3 " />
      )}
      <img alt={alt} src={url} layout="fill" />
      <div className=" w-60 h-12 flex justify-center items-center text-sm">
        {description}
      </div>
    </div>
  );
};
export default PreferrenceCard;
