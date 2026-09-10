import { request } from '@/utils';

export function createTemplate(data) {
  return request.post('/assessment/template', { data });
}

export function getTemplate(params) {
  return request.get('/assessment/template/list', { params });
}

export function getDraftTemplate(params) {
  return request.get('/assessment/template/draft/list', { params });
}

export function updateTemplate(data) {
  return request.put('/assessment/template', { data });
}

export function deleteTemplate(templateIds) {
  return request.delete(`/assessment/template/${templateIds}`);
}
