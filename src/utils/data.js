import { globalConfig } from '@/config';

import { is } from './is.js';

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

export function buildTree(data, options = {}) {
  const { childrenKey = 'children', idKey = 'id', parentIdKey = 'parentId', rootId = null } = options;

  const map = {};
  const result = [];

  data.forEach((item) => {
    map[item[idKey]] = { ...item, [childrenKey]: [] };
  });

  data.forEach((item) => {
    const node = map[item[idKey]];
    if (item[parentIdKey] === rootId || !item[parentIdKey]) {
      result.push(node);
    } else {
      const parent = map[item[parentIdKey]];
      if (parent) {
        parent[childrenKey].push(node);
      }
    }
  });

  return result;
}

function flattenObjectTree(data, childrenKey) {
  const source = [data];
  const result = [];

  while (source.length) {
    const node = source.shift();
    const { [childrenKey]: children = [], ...rest } = node;
    source.unshift(...(children ?? []));
    result.push(rest);
  }

  return result;
}

function flattenArrayTree(data, childrenKey) {
  return data.flatMap((node) => flattenObjectTree(node, childrenKey));
}

export function flattenTree(data, options = {}) {
  const { childrenKey = 'children' } = options;

  return is.array(data) ? flattenArrayTree(data, childrenKey) : flattenObjectTree(data, childrenKey);
}
