import { request } from '@/utils';

export function getOnline(params) {
  return request.get('/monitor/online/list', { params });
}

export function deleteOnline(tokenId) {
  return request.delete(`/monitor/online/${tokenId}`);
}
