import { request } from '@/utils';

export function createDept(data) {
  return request.post('/system/dept', { data });
}

export function deleteDept(deptId) {
  return request.delete(`/system/dept/${deptId}`);
}

export function updateSort(data) {
  return request.post('/system/dept/update/sort', { data });
}

export function getDept(params) {
  return request.get('/system/dept/list', { params });
}

export function exclude(deptId) {
  return request.get(`/system/dept/list/exclude/${deptId}`);
}
