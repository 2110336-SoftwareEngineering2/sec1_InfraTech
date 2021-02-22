import fire from '../config/firebase';
import { Upload, message, Button } from 'antd';
import React, { Component, useState } from 'react';
import Image from 'next/image';

const CustomUpload = ({ value, onChange }) => {
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        file,
        imageUrl,
        ...value,
        ...changedValue,
      });
    }
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value?.imageUrl || '');
  const [file, setFile] = useState(value?.file || null);
  const [fileList, setFileList] = useState([]);
  const handleChange = (info) => {
    console.log(info);
    setFile(info.file);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj).then((imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
        setFileList([info.file]);
        triggerChange({
          file: file,
          imageUrl: imageUrl,
        });
      });
      console.log(imageUrl);
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
    <div className="relative flex-col">
      {
        imageUrl ? <Image src={imageUrl} width={240} height={240} /> : null
      }
      <Upload
        name="avatar"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        fileList={fileList}
        showUploadList={false}
      >
        <Button>Change</Button>
      </Upload>
    </div>
  );
};

export default CustomUpload;

// const customUpload = async ({ onError, onSuccess, file }) => {
//     const storage = fire.storage();
//     const metadata = {
//       contentType: 'image/jpeg',
//     };
//     const storageRef = await storage.ref();
//     const imageName = Date.now().toString() + '_' + file.name; //a unique name for the image
//     const imgFile = storageRef.child(`profileImage/${imageName}`);
//     try {
//       const image = await imgFile.put(file, metadata);
//       onSuccess(null, image);
//     } catch (e) {
//       onError(e);
//     }
//   };
