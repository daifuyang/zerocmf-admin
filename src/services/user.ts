import { authRequest } from '@/utils/request';

// 登录

interface loginParams {
  login: string;
  password: string;
}

export async function login(data: loginParams) {
  return authRequest('/api/v1/user/login', {
    method: 'POST',
    data,
  });
}
// 获取当前用户信息
export async function currentUser() {
  return authRequest('/api/v1/user/current_user', {
    method: 'GET',
  });
}