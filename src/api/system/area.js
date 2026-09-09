import { request } from '@/utils';

export function queryAreaList(params) {
  return request.get('/system/area/queryAreaList', { params });
}
