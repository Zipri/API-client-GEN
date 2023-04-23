import React, { FC } from 'react';
import { LoaderProps } from './models';
import cl from './Loader.module.scss';
import { Spin } from 'antd';

const Loader: FC<LoaderProps> = ({  }) => {
  return (
    <div className={cl.loader}>
      <Spin />
    </div>
  );
};

export { Loader };
