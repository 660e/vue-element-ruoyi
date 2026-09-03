import { defineStore } from 'pinia';

import { getDictDataType } from '@/api/system/dict.js';
import { setSessionStorage, getSessionStorage } from '@/utils';

export const useDictStore = defineStore('dict', () => {
  const dictCache = reactive(new Map());
  const pendingRequests = new Map();

  async function getList(type) {
    if (!type) {
      return [];
    }
    if (dictCache.has(type)) {
      return dictCache.get(type);
    }
    if (pendingRequests.has(type)) {
      return pendingRequests.get(type);
    }

    const sessionData = getSessionStorage(type);
    if (sessionData) {
      try {
        const dict = JSON.parse(sessionData);
        dictCache.set(type, dict);

        return dict;
      } catch {
        return [];
      }
    }

    const request = (async () => {
      try {
        const { data } = await getDictDataType(type);
        const dict = data.map((e) => ({ label: e.dictLabel, value: e.dictValue, tag: e.listClass }));
        dictCache.set(type, dict);
        setSessionStorage(type, JSON.stringify(dict));

        return dict;
      } catch {
        return [];
      }
    })().finally(() => {
      pendingRequests.delete(type);
    });

    pendingRequests.set(type, request);
    return request;
  }

  return { getList };
});
