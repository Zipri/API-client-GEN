import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@components/layout';

import { Loader } from '@components/loader';
import { GO_HOME } from './constants';

const RoutesManager: FC = () => {
  return (
    <>
      <Routes>
        <Route path={GO_HOME} element={<Layout />}></Route>
      </Routes>
    </>
  );
};

export default RoutesManager;
