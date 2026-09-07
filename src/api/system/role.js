import { request } from '@/utils';

export function createRole(data) {
  return request.post('/system/role', { data });
}

export function getRole(params) {
  return request.get('/system/role/list', { params });
}

export function updateRole(data) {
  return request.put('/system/role', { data });
}

export function deleteRole(roleId) {
  return request.delete(`/system/role/${roleId}`);
}
