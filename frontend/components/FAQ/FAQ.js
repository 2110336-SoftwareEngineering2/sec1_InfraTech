import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import FAQList from './FAQList';
import FAQCreateFormModal from './FAQCreateFormModal';

const FAQ = ({ faqs, mutateFAQ, canEdit }) => {
  const [showCreateFAQ, setShowCreateFAQ] = useState(false);
  return (
    <>
      <FAQList faqs={faqs} mutateFAQ={mutateFAQ} canEdit={canEdit} />
      {canEdit && (
        <div
          className="shadow-around mb-4 bg-gray-100 h-20 text-3xl text-gray-500 flex justify-center items-center hover:bg-gray-200"
          onClick={() => setShowCreateFAQ(true)}
        >
          <PlusOutlined />
        </div>
      )}
      <FAQCreateFormModal
        faqs={faqs}
        mutateFAQ={mutateFAQ}
        visible={showCreateFAQ}
        setVisible={setShowCreateFAQ}
      />
    </>
  );
};

export default FAQ;
