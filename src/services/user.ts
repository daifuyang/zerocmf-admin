import { authRequest } from '@/utils/request';

// 登录

interface loginParams {
  login: string;
  password: string;
}

export async function login(params: loginParams) {
  return authRequest('/api/v1/user/login', {
    method: 'GET',
    params,
  });
}
// 获取当前用户信息
export async function currentUser() {
  return authRequest('/api/v1/user/current', {
    method: 'GET',
  });
}

// 获取管理员列表
export async function getSystemUsers(params: any) {
  return authRequest('/api/v1/user/admins', {
    method: 'GET',
    params,
  });
}
