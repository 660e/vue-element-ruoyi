import { request } from '@/utils';

export function captchaImage() {
  return request.get('/captchaImage');
}
