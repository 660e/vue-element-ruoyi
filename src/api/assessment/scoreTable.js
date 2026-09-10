import { request } from '@/utils';

export function createScoreTable(data) {
  return request.post('/assessment/scoreTable', { data });
}

export function getScoreTable(params) {
  return request.get('/assessment/scoreTable/list', { params });
}

export function updateScoreTable(data) {
  return request.put('/assessment/scoreTable', { data });
}

export function deleteScoreTable(scoreTableIds) {
  return request.delete(`/assessment/scoreTable/${scoreTableIds}`);
}
