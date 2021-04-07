import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Modal } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import { setFirstCapitalLetter } from '../../lib/setCapitalLetter';
import { COOKIE_NAME, API_HOST } from '../../config/config';
import FAQEditFormModal from './FAQEditFormModal';

const FAQItem = ({ faq, faqs, mutateFAQ, canEdit }) => {
  const [token] = useCookies([COOKIE_NAME]);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_HOST}/faq/${id}`, {
        headers: {
          Authorization: `Bearer ${token[COOKIE_NAME] || ''}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      mutateFAQ([faqs.filter((faq) => faq.id !== id)]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-6 shadow-around mb-4">
        <div className="mb-6 flex justify-between">
          <span className=" text-green-400 font-bold text-xl">
            <QuestionCircleOutlined />
            {` : ${setFirstCapitalLetter(faq.question)}`}
          </span>
          {canEdit && (
            <div className="text-lg text-gray-400">
              <EditOutlined
                className="ml-2 hover:text-black"
                onClick={() => setShowEditForm(true)}
              />
              <DeleteOutlined
                className="ml-2 hover:text-black"
                onClick={() =>
                  Modal.confirm({
                    title: 'Confirmation',
                    content:
                      'Are you sure you want to delete this FAQ? This action cannot be undone.',
                    centered: true,
                    onOk: () => handleDelete(faq.id),
                  })
                }
              />
            </div>
          )}
        </div>
        <span className=" text-red-500 font-bold text-xl">
          <AlertOutlined /> {` : ${setFirstCapitalLetter(faq.answer)}`}
        </span>
      </div>
      <FAQEditFormModal
        faqs={faqs}
        id={faq.id}
        mutateFAQ={mutateFAQ}
        visible={showEditForm}
        setVisible={setShowEditForm}
        initialFormValues={faq}
      />
    </>
  );
};

export default FAQItem;
