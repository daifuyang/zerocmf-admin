import { login } from '@/services/user';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Space, Tabs, message } from 'antd';
import { CSSProperties, useState } from 'react';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginRoot = useEmotionCss(() => {
    return {
      position: 'relative',
      background: '#fff',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    };
  });

  const loginContainer = useEmotionCss(() => {
    return {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    };
  });

  const loginWrap = useEmotionCss(() => {
    return {
      display: 'flex',
      zIndex: 99,
      flex: 1,
      maxWidth: 1140,
      margin: '0 auto',
    };
  });

  const flexItem = useEmotionCss(() => {
    return {
      flex: 1,
      borderRadius: '6px 0 0 6px',
      background: 'rgba(255,255,255,0.1)',
      // 背景的模糊大小通过下面的属性值大小来调制
      backdropFilter: 'blur(5px)',
      boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.1)',
      padding: 24,
    };
  });

  const loginItem = useEmotionCss(() => {
    return {
      flex: 1,
    };
  });

  const flexContent = useEmotionCss(() => {
    return {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '80px 60px 40px 60px',
    };
  });

  const flexTop = useEmotionCss(() => {
    return {
      flex: 1,
    };
  });

  const loginContent = useEmotionCss(() => {
    return {
      borderRadius: '0 6px 6px 0',
      overflow: 'hidden',
      backgroundSize: '100%',
      backgroundPosition: 'top',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.1)',
    };
  });

  return (
    <div className={loginRoot}>
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          overflow: 'hidden',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <video
          src="/assets/videos/bg.mp4"
          autoPlay
          loop
          muted
          crossOrigin="anonymous"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className={loginContainer}>
        <div className={loginWrap}>
          <div className={flexItem}>
            <div className={flexContent}>
              <div className={flexTop}>
                <h1
                  className={useEmotionCss(() => ({
                    color: '#fff',
                    fontSize: 48,
                    fontWeight: 'bold',
                  }))}
                >
                  ZeroCMF
                </h1>
                <div
                  className={useEmotionCss(() => ({
                    color: '#fff',
                    marginTop: 32,
                    fontSize: 26,
                  }))}
                >
                  通用管理系统
                </div>
              </div>

              <div
                className={useEmotionCss(() => ({
                  color: '#fff',
                  fontSize: 20,
                }))}
              >
                版权所有 &copy; {new Date().getFullYear()} ZeroCMF TEAM
              </div>
            </div>
          </div>
          <div className={loginItem}>
            <div className={loginContent}>
              <div style={{ padding: '60px 0' }}>
                <LoginForm
                  logo="/assets/images/logo.svg"
                  title="ZeroCMF"
                  subTitle="通用后台管理系统"
                  onFinish={async (value: any) => {
                    const res = await login(value);
                    console.log('res', res);
                    if (res.code === 1) {
                      message.success(res.msg);
                      const jsonStr = JSON.stringify(res.data);
                      localStorage.setItem('token', jsonStr);
                      const currentUser = await initialState?.fetchUserInfo?.();
                      console.log('currentUser', initialState, currentUser);
                      setInitialState((prevState: any) => {
                        console.log('prevState', prevState);
                        return {
                          ...prevState,
                          currentUser,
                        };
                      });
                      history.push('/');
                      return;
                    }
                    message.error(res.msg);
                  }}
                  actions={
                    <Space>
                      其他登录方式
                      <AlipayCircleOutlined style={iconStyles} />
                      <TaobaoCircleOutlined style={iconStyles} />
                      <WeiboCircleOutlined style={iconStyles} />
                    </Space>
                  }
                >
                  <Tabs
                    centered
                    items={[
                      {
                        key: 'account',
                        label: '账号密码登录',
                      },
                      {
                        key: 'phone',
                        label: '手机号登录',
                      },
                    ]}
                    activeKey={loginType}
                    onChange={(activeKey) =>
                      setLoginType(activeKey as LoginType)
                    }
                  ></Tabs>
                  {loginType === 'account' && (
                    <>
                      <ProFormText
                        name="account"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'用户名'}
                        rules={[
                          {
                            required: true,
                            message: '请输入用户名!',
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'密码'}
                        rules={[
                          {
                            required: true,
                            message: '请输入密码！',
                          },
                        ]}
                      />
                    </>
                  )}
                  {loginType === 'phone' && (
                    <>
                      <ProFormText
                        fieldProps={{
                          size: 'large',
                          prefix: <MobileOutlined className={'prefixIcon'} />,
                        }}
                        name="mobile"
                        placeholder={'手机号'}
                        rules={[
                          {
                            required: true,
                            message: '请输入手机号！',
                          },
                          {
                            pattern: /^1\d{10}$/,
                            message: '手机号格式错误！',
                          },
                        ]}
                      />
                      <ProFormCaptcha
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        captchaProps={{
                          size: 'large',
                        }}
                        placeholder={'请输入验证码'}
                        captchaTextRender={(timing, count) => {
                          if (timing) {
                            return `${count} ${'获取验证码'}`;
                          }
                          return '获取验证码';
                        }}
                        name="captcha"
                        rules={[
                          {
                            required: true,
                            message: '请输入验证码！',
                          },
                        ]}
                        onGetCaptcha={async () => {
                          message.success('获取验证码成功！验证码为：1234');
                        }}
                      />
                    </>
                  )}
                  <div
                    style={{
                      marginBlockEnd: 24,
                    }}
                  >
                    <ProFormCheckbox noStyle name="autoLogin">
                      自动登录
                    </ProFormCheckbox>
                    <a
                      style={{
                        float: 'right',
                      }}
                    >
                      忘记密码
                    </a>
                  </div>
                </LoginForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
