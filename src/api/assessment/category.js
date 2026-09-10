import { request } from '@/utils';

export function createCategory(data) {
  return request.post('/assessment/category', { data });
}

export function getCategoryTree(params) {
  return request.get('/assessment/category/tree', { params });
}

export function getCategoryList(params) {
  return request.get('/assessment/category/list', { params });
}

export function updateCategory(data) {
  return request.put('/assessment/category', { data });
}

export function deleteCategory(categoryIds) {
  return request.delete(`/assessment/category/${categoryIds}`);
}
