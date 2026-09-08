import { request } from '@/utils';

export function createMenu(data) {
  return request.post('/system/menu', { data });
}

export function getMenu(params) {
  return request.get('/system/menu/list', { params });
}

export function updateMenu(data) {
  return request.put('/system/menu', { data });
}

export function deleteMenu(menuId) {
  return request.delete(`/system/menu/${menuId}`);
}

export function updateSort(data) {
  return request.put('/system/menu/updateSort', { data });
}
