import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

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
  /**
   * @name 代理配置
   * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
   * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
   * @doc 代理介绍 https://umijs.org/docs/guides/proxy
   * @doc 代理配置 https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  npmClient: 'pnpm',
});
