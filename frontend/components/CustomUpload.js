import { Upload, message, Button } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { LoadingOutlined } from '@ant-design/icons';
import { getBase64 } from '../lib/utils';

const CustomUpload = ({ value, onChange, setFile }) => {
  const triggerChange = imageUrl => {
    if (onChange) {
      onChange(imageUrl);
    }
  };

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    setFile(info.file);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj).then((imageUrl) => {
        setLoading(false);
        setFileList([info.file]);
        triggerChange(imageUrl);
      });
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      message.error('You can only upload image file!');
    }

    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  };

  return (
    <div className="relative flex-col item-center">
      <div className="relative ">
        <Image
          src={value || '/avatar.svg'}
          width={240}
          height={240}
          layout="fixed"
          className="rounded-full align-middle"
        />
        {loading && (
          <LoadingOutlined className="absolute top-1/2 left-1/2 -mt-2 -ml-2" />
        )}
      </div>
      <Upload
        name="avatar"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        fileList={fileList}
        showUploadList={false}
      >
        <Button className="w-24 mt-4">Change</Button>
      </Upload>
    </div>
  );
};

export default CustomUpload;
