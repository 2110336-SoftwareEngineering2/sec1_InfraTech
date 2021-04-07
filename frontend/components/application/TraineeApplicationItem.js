import { useState } from 'react';
import { Button } from 'antd';
import {
  CheckSquareOutlined,
  SyncOutlined,
  CloseSquareOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { API_HOST, COOKIE_NAME } from '../../config/config';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import CourseItemFooter from '../course/CourseItemFooter';

import {
  setAllFirstCapitalLetter,
  setFirstCapitalLetter,
} from '../../lib/setCapitalLetter';

import ReviewFormModal from '../review/ReviewFormModal';

// TODO: Implement onClick for register and cancel course
const TraineeApplicationItem = ({ app }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const course = app.course;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const renderSwitch = (mode) => {
    switch (mode) {
      case 'pending':
        return (
          <>
            Pending for approve
            <SyncOutlined className="m-2" />
          </>
        );
      case 'approved':
        return (
          <>
            Registered Course <CheckSquareOutlined className="m-2" />
          </>
        );
      case 'rejected':
        return (
          <>
            Rejected Course Please cancel and register again
            <CloseSquareOutlined className="m-2" />
          </>
        );
      case 'complete':
        return (
          <>
            Complete Course <CrownOutlined className="m-2" />
          </>
        );
      case 'reviewed':
        return (
          <>
            Complete Course <CrownOutlined className="m-2" />
          </>
        );
    }
  };

  const colorSwitch = (mode) => {
    switch (mode) {
      case 'approved':
        return 'indigo-100';
      case 'rejected':
        return 'red-100';
      case 'complete':
        return 'green-100';
      case 'reviewed':
        return 'green-100';
    }
  };

  const handleCancel = () => {
    axios.patch(
      `${API_HOST}/application/cancel/${course.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  };

  const handleReview = () => {
    setShowReviewForm(true);
  };

  return (
    <>
      <div className={`bg-${colorSwitch(app.status)} p-6 shadow-around mb-4`}>
        <div
          className={`bg-${colorSwitch(app.status)} mb-6 flex justify-between`}
        >
          <div className=" mb-6 flex justify-start">
            <div className=" ml-3 text-blue font-bold text-xl">
              {setAllFirstCapitalLetter(course.title)}
            </div>
            <div className=" ml-3 text-black font-bold text-xl">by trainer</div>
            <div className=" ml-3 text-red-500 font-bold text-xl">
              {setAllFirstCapitalLetter(course.trainer.firstname)}
            </div>
          </div>
          <div className="text-gray-600">
            <>
              {renderSwitch(app.status)}
              {app.status == 'pending' && (
                <Button
                  className="ml-6"
                  type="primary"
                  danger
                  onClick={handleCancel}
                >
                  cancel
                </Button>
              )}
              {app.status == 'complete' && (
                <Button
                  className="ml-6"
                  type="primary"
                  danger
                  onClick={handleReview}
                >
                  Review
                </Button>
              )}
            </>
          </div>
        </div>
        <div>{setFirstCapitalLetter(course.description)}</div>
        <CourseItemFooter course={course} />
      </div>
      <ReviewFormModal
        applicationId={app.id}
        visible={showReviewForm}
        setVisible={setShowReviewForm}
      />
    </>
  );
};

export default TraineeApplicationItem;
