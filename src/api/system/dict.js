import { request } from '@/utils';

export function createDictType(data) {
  return request.post('/system/dict/type', { data });
}

export function deleteDictType(id) {
  return request.delete(`/system/dict/type/${id}`);
}

export function updateDictType(data) {
  return request.put('/system/dict/type', { data });
}

export function getDictTypeList(params) {
  return request.get('/system/dict/type/list', { params });
}

export function getDictDataType(type) {
  return request.get(`/system/dict/data/type/${type}`);
}
