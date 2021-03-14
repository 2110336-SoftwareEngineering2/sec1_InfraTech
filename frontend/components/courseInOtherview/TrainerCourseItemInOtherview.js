import { Button, List, Space } from 'antd';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RadarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { USER_TYPE } from '../../config/UserType.config';

// TODO: Implement onClick for edit and delete icon
const TrainerCourseItemInOtherview = ({ course, ownView, type }) => {
  return (
    <div className="p-6 shadow-around mb-4">
      <div className="mb-6 flex justify-between">
        <span className=" text-blue font-bold text-xl">{course.title}</span>
        {type != USER_TYPE.TRAINER && (
          <div className="text-lg text-gray-400">
            {course.status == 'noregisted' ? (
              <Button className="ml-6" type="primary" primary>
                register
              </Button>
            ) : (
              <>
                {course.status == 'accepted' ? (
                  <>
                    already register <CheckSquareOutlined className="m-2" />
                  </>
                ) : (
                  <>
                    waiting for accept
                    <SyncOutlined className="m-2" />
                  </>
                )}
                <Button className="ml-6" type="primary" danger>
                  cancel
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="text-lg">{course.description}</div>
      <List.Item
        actions={[
          <IconText icon={<RadarChartOutlined />} text={course.specialize} />,
          <IconText icon={<DashboardOutlined />} text={course.level} />,
          <IconText
            icon={<ClockCircleOutlined />}
            text={`${course.period} days`}
          />,
          <IconText
            icon={<DollarCircleOutlined />}
            text={`${course.price} bahts`}
          />,
        ]}
      />
    </div>
  );
};

const IconText = ({ icon, text }) => (
  <Space className="text-lg text-gray-800">
    {icon}
    {text}
  </Space>
);

export default TrainerCourseItemInOtherview;
