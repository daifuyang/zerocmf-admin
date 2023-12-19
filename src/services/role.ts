import { authRequest } from '@/utils/request';

// 获取管理员角色列表
export async function getRoles(params: any) {
  return authRequest('/api/v1/user/roles', {
    method: 'GET',
    params,
  });
}

// 获取单个角色信息
export async function getRole(id: number, params: any = {}) {
  return authRequest(`/api/v1/user/roles/${id}`, {
    method: 'GET',
    params,
  });
}

// 新增单个角色

export async function addRole(data: any) {
  return authRequest('/api/v1/user/roles', {
    method: 'post',
    data,
  });
}

// 修改单个角色
export async function updateRole(id: number, data: any) {
  return authRequest(`/api/v1/user/roles/${id}`, {
    method: 'post',
    data,
  });
}

// 删除单个角色
export async function deleteRole(id: number) {
  return authRequest(`/api/v1/user/roles/${id}`, {
    method: 'DELETE',
  });
}
