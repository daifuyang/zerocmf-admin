import { authRequest } from '@/utils/request';

// 获取所有部门
export async function getDepartments(params = {}) {
  return authRequest('/api/v1/system/departments', {
    method: 'GET',
    params
  });
}

// 查看单个部门信息
export async function getDepartment(id: number, params: any = {}) {
  return authRequest(`/api/v1/system/departments/${id}`, {
    method: 'GET',
    params,
  });
}

// 新增当个部门信息
export async function addDepartment(data: any) {
  return authRequest('/api/v1/system/departments', {
    method: 'post',
    data,
  });
}

// 更新单个部门信息
export async function updateDepartment(id: number, params: any = {}) {
  return authRequest(`/api/v1/system/departments/${id}`, {
    method: 'post',
    params,
  });
}

// 删除单个部门
export async function deleteDepartment(id: number) {
  return authRequest(`/api/v1/system/departments/${id}`, {
    method: 'delete'
  });
}