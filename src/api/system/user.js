import { request } from '@/utils';

export function createUser(data) {
  return request.post('/system/user', { data });
}

export function getUser(params) {
  return request.get('/system/user/list', { params });
}

export function getUserById(userId) {
  return request.get(`/system/user/${userId}`);
}

export function updateUser(data) {
  return request.put('/system/user', { data });
}

export function deleteUser(userId) {
  return request.delete(`/system/user/${userId}`);
}
