<script setup lang="jsx">
import { useDictStore } from '@/stores';

defineOptions({ name: 'QColumn' });

const { dict } = defineProps({
  dict: { type: String, default: null },
});

const dictStore = useDictStore();

function formatter(_, __, cellValue) {
  if (dict) {
    const label = dictStore.getLabel(dict, cellValue);
    return <span>{label}</span>;
  }

  return cellValue;
}
</script>

<template>
  <el-table-column :formatter="formatter" />
</template>
