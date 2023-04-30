import React, { FC, useCallback } from 'react';
import { ErrorContentProps } from './models';
import cl from './ErrorModal.module.scss';
import { Modal } from 'antd';

const ErrorContent: FC<ErrorContentProps> = ({ data }) => {

  const convert = useCallback((__data: Record<string, string | Record<string, any>>): any => {
    if (!__data) return <></>;
    return Object.entries(__data)
      .filter(([key, value]) => !(!Number.isNaN(key) && !value))
      .map(([key, value], i) => (
        <p key={key + '_' + i}>
          {!Number.isNaN(+key) ? '' : key + ':  '}
          {
            typeof value === 'string' ?
              value 
              : typeof value !== 'object' ?
                JSON.stringify(value) 
                : convert(value || {})
          }
        </p>
      ));
  }, [data]);

  if (!data) return <></>;
  return (
    <div className={cl.errorContent}>
      {convert(data.err)}
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

