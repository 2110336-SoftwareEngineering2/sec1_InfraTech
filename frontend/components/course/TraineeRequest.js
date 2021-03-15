import { Button, List } from 'antd';
import Item from 'antd/lib/list/Item';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';
import { API_HOST, COOKIE_NAME } from '../../config/config';

const TraineeRequest = ({ course_id }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const { data: trainees } = useSWR(
    [`${API_HOST}/application/${course_id}`, token],
    async (url, token) => {
      if (!token[COOKIE_NAME]) return;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      return res?.data ?? {};
    },
  );

  console.log(trainees);
  const handleApprove = () => {};
  const handleReject = () => {};

  return (
    <List
      dataSource={trainees?.filter((item) => (Item.status = 'pending'))}
      itemLayout="vertical"
      renderItem={(item) => (
        <div className="bg-gray-100 m-4 p-4 text-lg flex justify-between text-gray-400">
          <div>{item.trainee.firstname}</div>
          <div>
            <Button
              className="ml-6"
              type="primary"
              primary
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              className="ml-6"
              type="primary"
              danger
              onClick={handleReject}
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default TraineeRequest;
