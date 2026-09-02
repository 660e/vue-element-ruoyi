import { globalConfig } from '@/config/global.js';

export function setLocalStorage(key, value) {
  return localStorage.setItem(`${globalConfig.app.id}_${key}`, value);
}

export function getLocalStorage(key) {
  return localStorage.getItem(`${globalConfig.app.id}_${key}`);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(`${globalConfig.app.id}_${key}`);
}

export function setSessionStorage(key, value) {
  return sessionStorage.setItem(`${globalConfig.app.id}_${key}`, value);
}

export function getSessionStorage(key) {
  return sessionStorage.getItem(`${globalConfig.app.id}_${key}`);
}

export function removeSessionStorage(key) {
  return sessionStorage.removeItem(`${globalConfig.app.id}_${key}`);
}
