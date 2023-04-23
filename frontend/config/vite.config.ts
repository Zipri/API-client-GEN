import path from 'path';
import { UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';

const config: UserConfigFn = ({ mode, command }) => {
  if (command === 'serve' && mode === 'production') {
    //
  }
  return {
    root: path.resolve(__dirname, '../src'),
    build: {
      outDir: path.resolve(__dirname, '../../dist')
    },
    server: {
      port: 3500,
      https: false
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'body-background': 'rgba(17, 25, 33, 1)',
            'component-background': 'rgba(17, 25, 33, 1)',
            'popover-background': 'rgba(17, 25, 33, 1)'
          }
        }
      }
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(process.cwd() + '/src') },
        { find: 'src', replacement: '/src' },
        { find: '@assets', replacement: path.resolve(process.cwd() + '/src/assets') },
        {
          find: '@icons',
          replacement: path.resolve(process.cwd() + '/src/assets/resources/icons')
        },
        { find: '@services', replacement: path.resolve(process.cwd() + '/src/services') },
        { find: '@components', replacement: path.resolve(process.cwd() + '/src/components') },
        { find: '@hooks', replacement: path.resolve(process.cwd() + '/src/hooks') },
        { find: '@styles', replacement: path.resolve(process.cwd() + '/src/styles') },
        { find: '@tools', replacement: path.resolve(process.cwd() + '/src/tools') },
        { find: '@pages', replacement: path.resolve(process.cwd() + '/src/pages') },
        { find: '@store', replacement: path.resolve(process.cwd() + '/src/store') },
        { find: '@uiKit', replacement: path.resolve(process.cwd() + '/src/ui-kit') },
        { find: '@types', replacement: path.resolve(process.cwd() + '/src/types') },
        { find: '@config', replacement: path.resolve(process.cwd() + '/src/config.ts') }
      ]
    },
    test: {
      globals: true
    },
    publicDir: path.resolve(__dirname, '../public')
  };
};

export default config;
