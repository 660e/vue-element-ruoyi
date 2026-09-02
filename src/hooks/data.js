import { getDictDataType } from '@/api/system/dict.js';
import { setSessionStorage, getSessionStorage } from '@/utils';

export function useDict() {
  async function list(type) {
    const dictList = getSessionStorage(type);
    if (dictList) {
      try {
        return JSON.parse(dictList);
      } catch {
        return [];
      }
    } else {
      const dictPromise = (async () => {
        try {
          const { data } = await getDictDataType(type);
          const dict = data.map((e) => ({ label: e.dictLabel, value: e.dictValue, tag: e.listClass }));

          setSessionStorage(type, JSON.stringify(dict));

          return dict;
        } catch {
          return [];
        }
      })();

      return dictPromise;
    }
  }

  function label() {}

  function value() {}

  return { list, label, value };
}

export function useRestAttrs(ignore = ['class', 'style']) {
  const attrs = useAttrs();
  const rest = { ...attrs };

  ignore.forEach((key) => delete rest[key]);

  return rest;
}
