import { authRequest } from '@/utils/request';

export async function addAdmin(data: any) {
  return authRequest('/api/v1/user/admins', {
    method: 'post',
    data,
  });
}
