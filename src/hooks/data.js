import { getDictDataType } from '@/api/system/dict.js';
import { setSessionStorage, getSessionStorage, is } from '@/utils';

const pendingRequests = new Map();
const dictCache = ref(new Map());

export function useDict() {
  async function list(type) {
    const sessionData = getSessionStorage(type);
    if (sessionData) {
      try {
        const dict = JSON.parse(sessionData);
        dictCache.value.set(type, dict);

        return dict;
      } catch {
        return [];
      }
    } else if (pendingRequests.has(type)) {
      return pendingRequests.get(type);
    } else {
      const request = (async () => {
        try {
          const { data } = await getDictDataType(type);
          const dict = data.map((e) => ({ label: e.dictLabel, value: e.dictValue, tag: e.listClass }));
          dictCache.value.set(type, dict);
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
  }

  function label(type, value) {
    const dictList = dictCache.value.get(type);
    if (is.array(dictList)) {
      const item = dictList.find((e) => e.value === value);
      return item ? item.label : '-';
    } else {
      list(type);
      return '-';
    }
  }

  function value() {}

  return { list, label, value };
}

export function useRestAttrs(ignore = ['class', 'style']) {
  const attrs = useAttrs();
  const rest = { ...attrs };

  ignore.forEach((key) => delete rest[key]);

  return rest;
}
