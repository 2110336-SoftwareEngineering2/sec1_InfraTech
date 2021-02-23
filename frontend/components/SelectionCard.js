import { CheckCircleFilled } from '@ant-design/icons';
import Image from 'next/image';

const SelectionCard = ({ checked, onClick, imageUrl, description }) => {
  return (
    <div
      className={`w-80 h-80 relative flex flex-col justify-center items-between rounded-md pt-2 border-2 m-5 bg-white ${
        checked ? ' border-blue' : 'border-gray-300'
      }`}
      onClick={onClick}
    >
      {checked && (
        <CheckCircleFilled className="absolute text-blue text-base top-3 right-3 z-10" />
      )}
      <div className="w-full h-48 relative rounded-md z-0 overflow-hidden">
        <Image layout="fill" alt={description} src={imageUrl} />
      </div>
      <div
        className={`w-full h-12 relative flex rounded-md items-center justify-center font-bold text-xl ${
          checked ? ' text-blue' : null
        }`}
      >
        {description}
      </div>
    </div>
  );
};
export default SelectionCard;
