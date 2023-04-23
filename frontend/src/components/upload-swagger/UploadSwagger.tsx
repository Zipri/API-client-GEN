import React, { FC, useState } from 'react';
import { UploadSwaggerProps } from './models';
import cl from './UploadSwagger.module.scss';
import { Button, UploadFile, message } from 'antd';
import Upload, { RcFile, UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadFile } from './helpers';
import { useApiContext } from '@components/layout';

const UploadSwagger: FC<UploadSwaggerProps> = ({ prop }) => {
  const { uploadSpec } = useApiContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleBeforeUpload = async (file: RcFile) => {
    if (!uploadSpec) return false;
    setLoading(true);
    const result = await uploadSpec(file);

    if (result) {
      message.success(`${file.name} file uploaded successfully`);
    } else {
      message.error(`${file.name} file upload failed.`);
    }
    setLoading(false);
    return false;
  };


  return (
    <div className={cl.uploadSwagger}>
      <Upload
        accept=".json"
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        className={cl.uploadSwagger__upload}
      >
        <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>Загрузить файл</Button>
      </Upload>
    </div>
  );
};

export { UploadSwagger };
