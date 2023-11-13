import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  styledComponents: {},
  clickToComponent: {},
  layout: {
    locale: false,
    ...defaultSettings,
  },
  routes,
  npmClient: 'pnpm',
});
