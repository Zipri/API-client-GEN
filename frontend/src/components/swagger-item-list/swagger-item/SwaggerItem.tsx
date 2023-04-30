import React, { FC, useMemo, useState } from 'react';
import { SwaggerItemProps } from './models';
import cl from './SwaggerItem.module.scss';
import { Button, Tooltip, message } from 'antd';
import { DeleteOutlined, ExceptionOutlined, LoadingOutlined, RadarChartOutlined } from '@ant-design/icons';

import { useApiContext } from '@components/layout';
import { GeneratedButton } from './generated-button';
import { ErrorModal } from '@components/error-modal';

const SwaggerItem: FC<SwaggerItemProps> = ({ data }) => {
  const {
    deleteSpec,
    setGenerateFileName,
    downloadSpec,
    validateSpec,
    clientList
  } = useApiContext();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [specValidating, setSpecValidating] = useState<boolean>(false);

  const generatedClientList = useMemo(() => {
    if (!clientList || !data.fileName) return [];
    return clientList.filter(item => item.spec === data.fileName);
  }, [clientList, data.fileName]);

  const handleOpenGenerateModal = async () => {
    setGenerateFileName && setGenerateFileName(data.fileName || null);
  };

  const handleDelete = async () => {
    if (!deleteSpec || !data.fileName) return;
    setIsDeleting(true);
    const response = await deleteSpec(data.fileName);
    setIsDeleting(false);
    console.log(response);
  };

  const handleDownloadSpec = async () => {
    if (!downloadSpec || !data.fileName) return;
    await downloadSpec(data.fileName);
  };

  const handleValidateSpec = async () => {
    if (!validateSpec || !data.fileName) return;
    setSpecValidating(true);
    const result = await validateSpec(data.fileName);
    setSpecValidating(false);
    if (result.err && result.err.length)
      ErrorModal('Ошибки в спецификации', result);
    else {
      message.success('Спецификация корректна');
    }
  };

  return (
    <div className={cl.swaggerItem}>
      <div className={cl.swaggerItem__row}>
        
          <p className={cl.swaggerItem__fileName}>
            <Tooltip title={(
              <span onClick={handleDownloadSpec} className={cl.swaggerItem__downloadSpec}>{data.fileName}</span>
            )}>
              {data.title || data.fileName}
            </Tooltip>
            <span className={cl.swaggerItem__version}>Версия: {data.version}</span>
            <Tooltip title="Валидация спецификации">
              {specValidating ? <LoadingOutlined /> : <ExceptionOutlined onClick={handleValidateSpec} />}
            </Tooltip>
          </p>
        
        <Button icon={isDeleting ? <LoadingOutlined /> : <DeleteOutlined />} onClick={handleDelete}>
          Удалить
        </Button>
      </div>
      <div className={cl.swaggerItem__row}>

        <Button icon={<RadarChartOutlined />} onClick={handleOpenGenerateModal}>
          Сгенерировать клиент
        </Button>

        <div className={cl.swaggerItem__generatedList}>
          {
            generatedClientList.map(item => (
              <GeneratedButton data={item} key={item.spec + item.type} />
            ))
          }
        </div>
      </div>
      
      
      


    </div>
  );
};

export { SwaggerItem };
