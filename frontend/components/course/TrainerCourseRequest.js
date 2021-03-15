import { List, Form } from 'antd';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';
import { API_HOST, COOKIE_NAME } from '../../config/config';
import TraineeRequest from './TraineeRequest';

const TrainerCourseRequest = () => {
  const [token] = useCookies([COOKIE_NAME]);
  const { data: courses } = useSWR(
    [`${API_HOST}/course`, token],
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
  console.log(courses);
  return (
    <List
      dataSource={courses}
      itemLayout="vertical"
      renderItem={(item) => (
        <div className="bg-white p-6 shadow-around mb-4">
          <div className="bg-white mb-4 flex flex-col justify-between">
            <span className=" text-blue font-bold text-xl">{item.title}</span>
            <TraineeRequest course_id={item.id} />
          </div>
        </div>
      )}
    />
  );
};

export default TrainerCourseRequest;
