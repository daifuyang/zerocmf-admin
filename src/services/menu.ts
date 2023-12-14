import { authRequest } from '@/utils/request';

export async function getMenus(params = {}) {
  return authRequest('/api/v1/system/menus', {
    method: 'GET',
    params,
  });
}
