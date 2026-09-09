import { request } from '@/utils';

export function createDept(data) {
  return request.post('/system/dept', { data });
}

export function getDept(params) {
  return request.get('/system/dept/list', { params });
}

export function getDeptById(deptId) {
  return request.get(`/system/dept/${deptId}`);
}

export function getExclude(deptId) {
  return request.get(`/system/dept/list/exclude/${deptId}`);
}

export function updateDept(data) {
  return request.put('/system/dept', { data });
}

export function deleteDept(deptId) {
  return request.delete(`/system/dept/${deptId}`);
}

export function updateSort(data) {
  return request.put('/system/dept/updateSort', { data });
}
