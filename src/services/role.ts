import { authRequest } from '@/utils/request';

// 获取管理员角色列表
export async function getRoles(params: any) {
  return authRequest('/api/v1/user/roles', {
    method: 'GET',
    params,
  });
}
