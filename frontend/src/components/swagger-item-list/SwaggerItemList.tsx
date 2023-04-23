import React, { FC } from 'react';
import { SwaggerItemListProps } from './models';
import cl from './SwaggerItemList.module.scss';
import { SwaggerItem } from './swagger-item';
import { useApiContext } from '@components/layout';
import { Loader } from '@components/loader';

const SwaggerItemList: FC<SwaggerItemListProps> = ({  }) => {
  const { specList, specListLoading } = useApiContext();

  return (
    <div className={cl.swaggerItemListWrap}>
      <div className={cl.swaggerItemList + (specListLoading ? ' ' + cl.loading : '')}>
        {specList?.map(item => (
          <SwaggerItem data={item} key={item.fileName} />
        ))}
      </div>
      {specListLoading && <Loader />}
    </div>
  );
};

export { SwaggerItemList };
