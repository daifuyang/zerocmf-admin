// 运行时配置
import {
  ProBreadcrumb,
  type Settings as LayoutSettings,
} from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {
  AvatarDropdown,
  AvatarName,
} from './components/RightContent/AvatarDropdown';

import { createGlobalStyle, history } from '@umijs/max';

import { currentUser as queryCurrentUser } from '@/services/user';
import { AppstoreOutlined } from '@ant-design/icons';
import { RequestConfig } from '@umijs/max';
import { Tooltip, message, notification } from 'antd';
import Footer from './components/Footer';
import styles from './style.less';
import { codeMessage } from './utils/request';

const loginPath = '/user/login';

export const styledComponents = {
  GlobalStyle: createGlobalStyle``,
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any; // TODO: 定义当前用户信息
  fetchUserInfo?: () => Promise<any | undefined>;
}> {
  const fetchUserInfo = async () => {
    const res = await queryCurrentUser();
    if (res.code !== 1) {
      message.error('用户身份已失效!');
      history.push(loginPath);
      return undefined;
    }
    return res.data;
  };

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();

    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  // setInitialState,
}) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    menu: {
      locale: false,
    },
    breadcrumbRender: (routers = []) => [...routers],
    headerContentRender: () => {
      return (
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {}}
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              color: '#fff',
            }}
          >
            <Tooltip title="菜单管理">
              <AppstoreOutlined />
            </Tooltip>
          </div>
          <div className={styles.breadcrumb}>
            <ProBreadcrumb />
          </div>
        </div>
      );
    },
    footerRender: () => <Footer />,
    childrenRender: (children) => {
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

const authHeaderInterceptor = (
  url: string,
  options: RequestConfig & { token: string },
) => {
  if (options.token) {
    const token: any = localStorage.getItem('token');
    if (token) {
      const data = JSON.parse(token);
      options.headers = {
        Authorization: `Bearer ${data.access_token}`,
      };
    } else {
      history.push(loginPath);
    }
  }

  return {
    url,
    options,
  };
};

// 请求拦截器
export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
  errorConfig: {
    errorHandler(error: any) {
      const { response } = error;
      if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;

        notification.error({
          message: `请求错误 ${status}: ${url}`,
          description: errorText,
        });

        if (status === 401) {
          history.push(loginPath);
        }
      } else if (!response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
      }

      return response;
    },
  },
};
