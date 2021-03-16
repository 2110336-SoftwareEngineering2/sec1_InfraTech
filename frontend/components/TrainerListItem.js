import Image from 'next/image';
import { Tag, Rate } from 'antd';

const TrainerListItem = ({ trainer }) => {
  return (
    <div className="p-6 shadow-around my-6">
      <div className="flex">
        <Image
          src={trainer.profileImageUrl || '/avatar.svg'}
          width={180}
          height={180}
          layout="fixed"
          className="rounded-full"
        />
        <div className="mx-8 my-6">
          <div className="font-bold text-2xl">
            {trainer.firstname + ' ' + trainer.lastname}
          </div>
          {trainer &&
            trainer.user.preferences.map((preference) => (
              <Tag color="green" className="text-xl mt-2">
                {preference.name}
              </Tag>
            ))}
          <Rate
            disabled
            allowHalf
            value={trainer.averageRating}
            className="block text-2xl mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainerListItem;
