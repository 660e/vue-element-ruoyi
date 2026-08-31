import { request } from '@/utils';

export function captchaImage() {
  return request.get('/captchaImage');
}

export function login(data) {
  return request.post('/login', { data });
}
