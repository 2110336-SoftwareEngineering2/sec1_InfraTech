import { CheckCircleFilled } from '@ant-design/icons';
import Image from 'next/image';

const SelectionCard = ({
  checked,
  onClick,
  imageUrl,
  description,
  width,
  height,
}) => {
  return (
    <div
      className={`relative cursor-pointer border-2 rounded-lg transition-all ${
        checked ? ' border-blue' : 'border-gray-300'
      }`}
      style={{ width, height }}
      onClick={onClick}
    >
      <div className="flex justify-items-center items-center w-full h-4/5">
        <img
          alt={description}
          src={imageUrl}
          style={{ margin: '0 auto', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <CheckCircleFilled
        className={`absolute text-blue text-2xl top-3 right-3 z-auto ${
          !checked && 'hidden'
        }`}
      />
      <div
        className={`flex justify-center items-center text-xl font-bold p-2 h-1/5 ${
          checked && 'text-blue'
        }`}
      >
        {description}
      </div>
    </div>
  );
};
export default SelectionCard;
