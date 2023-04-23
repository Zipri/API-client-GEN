import '@styles/index.scss';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/ru_RU';

import RoutesManager from './routes/RoutesManager';

export const App = () => {
  return (
    <ConfigProvider locale={locale}>
      <RoutesManager />
    </ConfigProvider>
  );
};
