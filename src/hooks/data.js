export function useRestAttrs(ignore = ['class', 'style']) {
  const attrs = useAttrs();
  const rest = { ...attrs };

  ignore.forEach((key) => delete rest[key]);

  return rest;
}
