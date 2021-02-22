import fire from '../config/firebase';
import { Upload } from 'antd';
import React, { Component, useState } from 'react';

const CustomUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      AntMessage.error('You can only upload image file!');
    }

    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      AntMessage.error('Image must smaller than 5MB!');
    }
    return isImage && isLt5M;
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    const storage = fire.storage();
    const metadata = {
      contentType: 'image/jpeg',
    };
    console.log(file);
    const storageRef = await storage.ref();
    const imageName = Date.now().toString() + '_' + file.name; //a unique name for the image
    const imgFile = storageRef.child(`profileImage/${imageName}`);
    try {
      const image = await imgFile.put(file, metadata);
      onSuccess(null, image);
    } catch (e) {
      onError(e);
    }
  };

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customUpload}
      >
        {!imageUrl && <div className="ant-upload-text">Upload</div>}

        {/* {imageUrl ? (
          <img src={imageUrl} alt="avatar" />
        ) : (
          <div>
            <div className="ant-upload-text">Upload</div>
          </div>
        )} */}
      </Upload>
    </div>
  );
};

export default CustomUpload;
