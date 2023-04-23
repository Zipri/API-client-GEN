import React, { FC, useEffect, useState } from 'react';

import cl from './Layout.module.scss';
import { LayoutProps } from './models';
import { SwaggerItemList } from '@components/swagger-item-list';
import { mockSwaggerItems } from './constants';
import { UploadSwagger } from '@components/upload-swagger';
import { useSpecApi } from '@tools/hooks/api/spec/spec';
import { useGeneratorApi } from '@tools/hooks/api/generator/generator';
import { GenerateClientModal } from '@components/generate-client-modal';
import { useGeneratedClientApi } from '@tools/hooks/api/generatedClient/generatedClient';

export type ApiContextType = 
  Partial<ReturnType<typeof useSpecApi>> 
  & Partial<ReturnType<typeof useGeneratorApi>>
  & Partial<ReturnType<typeof useGeneratedClientApi>>
  & {
    setGenerateFileName?: React.Dispatch<React.SetStateAction<string | null>>
  };

export const ApiContext = React.createContext<ApiContextType>({});

export const useApiContext = () => React.useContext(ApiContext);

const Layout: FC<LayoutProps> = ({ prop }) => {
  const [generateFileName, setGenerateFileName] = useState<string | null>(null);
  const specApi = useSpecApi();
  const generatorApi = useGeneratorApi();
  const generatedClientApi = useGeneratedClientApi();

  return (
    <ApiContext.Provider
      value={{
        ...specApi,
        ...generatorApi,
        ...generatedClientApi,
        setGenerateFileName
      }}
    >
      <div className={cl.layout} style={{ color: 'white', width: '100%' }}>
        <SwaggerItemList />
        <UploadSwagger />
      </div>

      <GenerateClientModal fileName={generateFileName} />

    </ApiContext.Provider>
  );
};

export { Layout };
