import { request } from '@/utils';

export function getDeptList(params) {
  return request.get('/system/dept/list', { params });
}
