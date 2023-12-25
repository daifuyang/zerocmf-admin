import { authRequest } from '@/utils/request';

// 获取岗位列表
export async function getPosts(params: any) {
  return authRequest('/api/v1/user/posts', {
    method: 'GET',
    params,
  });
}

// 查看单个岗位
export async function getPost(id: number, params: any = {}) {
  return authRequest(`/api/v1/user/posts/${id}`, {
    method: 'GET',
    params,
  });
}

// 新增岗位
export async function addPost(data: any) {
  return authRequest('/api/v1/user/posts', {
    method: 'post',
    data,
  });
}

// 修改单个岗位
export async function updatePost(id: number, data: any) {
  return authRequest(`/api/v1/user/posts/${id}`, {
    method: 'post',
    data,
  });
}

// 删除单个岗位
export async function deletePost(id: number) {
  return authRequest(`/api/v1/user/posts/${id}`, {
    method: 'DELETE',
  });
}
