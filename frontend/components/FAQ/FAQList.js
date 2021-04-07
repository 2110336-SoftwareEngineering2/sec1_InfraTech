import { List } from 'antd';

import FAQItem from './FAQItem';

const FAQList = ({ faqs, mutateFAQ, canEdit }) => {
  return (
    <List
      dataSource={faqs}
      itemLayout="vertical"
      renderItem={(faq) => {
        if (faqs)
          return (
            <FAQItem
              faq={faq}
              faqs={faqs}
              mutateFAQ={mutateFAQ}
              canEdit={canEdit}
            />
          );
      }}
    />
  );
};

export default FAQList;
