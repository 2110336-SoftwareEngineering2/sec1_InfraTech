import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ReviewList = ({ reviews }) => {
  return (
    <List
      dataSource={reviews}
      itemLayout="vertical"
      renderItem={(review) => {
        if (review)
          return (
            <div className="p-6 shadow-around mb-4 font-bold text-xl">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              {': ' + review.comment}
            </div>
          );
      }}
    />
  );
};

export default ReviewList;
