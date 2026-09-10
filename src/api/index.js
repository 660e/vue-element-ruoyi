import { request } from '@/utils';

export function captchaImage() {
  return request.get('/captchaImage');
}

export function login(data) {
  return request.post('/login', { data });
}

export function logout() {
  return request.post('/logout');
}

export function getRouters() {
  return request.get('/getRouters');
}
