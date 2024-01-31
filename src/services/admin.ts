import { authRequest } from '@/utils/request';

// 获取管理员列表
export async function getAdmins(params: any) {
  return authRequest('/api/v1/user/admins', {
    method: 'GET',
    params,
  });
}

export async function getAdmin(id: number) {
  return authRequest(`/api/v1/user/admins/${id}`, {
    method: 'GET',
  });
}

export async function addAdmin(data: any) {
  return authRequest('/api/v1/user/admins', {
    method: 'post',
    data,
  });
}

// 删除单个管理员
export async function deleteAdmin(id: number) {
  return authRequest(`/api/v1/user/admins/${id}`, {
    method: 'delete',
  });
}
