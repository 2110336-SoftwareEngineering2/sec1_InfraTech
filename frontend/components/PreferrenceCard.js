import { CheckCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import Image from 'next/image';

const PreferrenceCard = ({ url, description, alt }) => {
  const [click, setClick] = useState(false);
  return (
    <div
      className={`w-60 h-64 flex flex-col justify-center items-between rounded-md border-2 relative ${
        click ? ' border-blue' : 'border-black-500 '
      }`}
      onClick={() => {
        setClick(!click);
      }}
    >
      {click && (
        <CheckCircleFilled className="absolute text-blue text-base top-3 right-3 z-10" />
      )}
      <div className="w-58 h-52 flex flex-col justify-center items-center rounded-md z-0 ">
        <Image alt={alt} src={url} height={200} width={240} />
      </div>
      <div className=" w-60 h-12 flex flex-row justify-center text-md">
        {description}
      </div>
    </div>
  );
};
export default PreferrenceCard;
