import { request } from '@/utils';

export function getDictTypeList(params) {
  return request.get('/system/dict/type/list', { params });
}
