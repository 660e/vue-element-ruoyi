import { request } from '@/utils';

export function createJob(data) {
  return request.post('/monitor/job', { data });
}

export function getJob(params) {
  return request.get('/monitor/job/list', { params });
}

export function updateJob(data) {
  return request.put('/monitor/job', { data });
}

export function deleteJob(jobId) {
  return request.delete(`/monitor/job/${jobId}`);
}
