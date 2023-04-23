import React, { FC, useState } from 'react';
import { GeneratedButtonProps } from './models';
import cl from './GeneratedButton.module.scss';
import { Tooltip } from 'antd';
import { DeleteOutlined, FileZipOutlined, LoadingOutlined } from '@ant-design/icons';
import { useApiContext } from '@components/layout';

const GeneratedButton: FC<GeneratedButtonProps> = ({ data }) => {
  const { deleteGeneratedClient, getGeneratedClientZip } = useApiContext();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!deleteGeneratedClient) return;
    setIsDeleting(true);
    await deleteGeneratedClient({
      name: data.name,
      directory: data.directory
    });
    setIsDeleting(false);
  };

  const handleDownload = async () => {
    if (!getGeneratedClientZip) return;
    setIsDownloading(true);
    await getGeneratedClientZip(data);
    setIsDownloading(false);
  };

  return (
      <div 
        className={cl.generatedButton}
      >
        <Tooltip
          title={isDownloading ? `Скачивание` : `Скачать архив`}
        >
          <span
            className={cl.generatedButton__download}
            onClick={handleDownload}
          >
            {isDownloading ? <LoadingOutlined /> : <FileZipOutlined />} {data.type}
            <span className={cl.generatedButton__version}>Версия: {data.version}</span>
          </span>
        </Tooltip>
        {/* <LoadingOutlined style={{ opacity: isDownloading ? 1 : 0 }} /> */}
        <Tooltip
          title={isDeleting ? `Удаление` : `Удалить`}
        >
          <span
            onClick={handleDelete}
            className={cl.generatedButton__delete}  
          >
            {isDeleting ? <LoadingOutlined /> : <DeleteOutlined />}
          </span>
        </Tooltip>

      </div>
  );
};

export { GeneratedButton };