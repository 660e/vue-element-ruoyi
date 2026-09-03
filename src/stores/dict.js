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
        const dictList = JSON.parse(sessionData);
        dictCache.set(type, dictList);

        return dictList;
      } catch {
        return [];
      }
    }

    const request = (async () => {
      try {
        const { data } = await getDictDataType(type);
        const dictList = data.map((e) => ({ label: e.dictLabel, value: e.dictValue, tag: e.listClass }));
        dictCache.set(type, dictList);
        setSessionStorage(type, JSON.stringify(dictList));

        return dictList;
      } catch {
        return [];
      }
    })().finally(() => {
      pendingRequests.delete(type);
    });

    pendingRequests.set(type, request);
    return request;
  }

  function getLabel(type, value) {
    const dictList = dictCache.get(type);
    if (!dictList) {
      getList(type);
      return '-';
    }

    return dictList.find((e) => e.value === value)?.label ?? '-';
  }

  function getValue(type, label) {
    const dictList = dictCache.get(type);
    if (!dictList) {
      getList(type);
      return '-';
    }

    return dictList.find((e) => e.label === label)?.value ?? '-';
  }

  function getTag(type, value) {
    const dictList = dictCache.get(type);
    if (!dictList) {
      getList(type);
      return '-';
    }

    return dictList.find((e) => e.value === value)?.tag;
  }

  return { getList, getLabel, getValue, getTag };
});
