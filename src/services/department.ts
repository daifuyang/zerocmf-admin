import { authRequest } from '@/utils/request';

export async function getDepartments() {
  return authRequest('/api/v1/user/departments', {
    method: 'GET',
  });
}
