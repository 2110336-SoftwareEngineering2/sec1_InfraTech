import { List, Form } from 'antd';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

import TraineeRequest from './TraineeRequest';

import {
  setAllFirstCapitalLetter,
} from '../../lib/setCapitalLetter';
import { API_HOST, COOKIE_NAME } from '../../config/config';

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
  return (
    <List
      dataSource={courses}
      itemLayout="vertical"
      renderItem={(item) => (
        <div className="bg-white p-6 shadow-around mb-4">
          <div className="bg-white mb-1 flex flex-col justify-between">
            <span className=" text-blue m-1 font-bold text-xl">
              {setAllFirstCapitalLetter(item.title)}
            </span>
            <span className="font-bold text-xl m-1">New trainee</span>
            <TraineeRequest course_id={item.id} filter="pending" />
            <hr className="my-4" />
            <span className="font-bold text-xl m-1">
              Trainee in this course
            </span>
            <TraineeRequest course_id={item.id} filter="approved" />
          </div>
        </div>
      )}
    />
  );
};

export default TrainerCourseRequest;
