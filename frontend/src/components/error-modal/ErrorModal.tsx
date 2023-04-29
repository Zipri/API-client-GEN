import React, { FC, useMemo } from 'react';
import { ErrorContentProps } from './models';
import cl from './ErrorModal.module.scss';
import { Modal } from 'antd';

const ErrorContent: FC<ErrorContentProps> = ({ data }) => {
  const filtered = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.err).filter(([key, value]) => !(!Number.isNaN(key) && !value));
  }, [data]);
  if (!data) return <></>;
  return (
    <div className={cl.errorContent}>
      {
        filtered.map(([key, value]) => (
          <p>{!Number.isNaN(key) ? '' : key + ':'} {typeof value === 'string' ? value : JSON.stringify(value)}</p>
        ))
      }
    </div>
  );
};

const ErrorModal = (title: string, data: ErrorContentProps['data']) => {
  Modal.error({
    title,
    width: '50vw',
    style: { top: '35px' },
    content: <ErrorContent data={data}/>,
    wrapClassName: cl.errorModal
  });
};

export { ErrorModal };

