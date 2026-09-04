<script setup lang="jsx">
import { useDictStore } from '@/stores';

defineOptions({ name: 'QColumn' });

const { dict } = defineProps({
  dict: { type: String },
  operation: { type: Boolean },
});

const dictStore = useDictStore();

function formatter(_, __, cellValue) {
  if (dict) {
    const label = dictStore.getLabel(dict, cellValue);
    const tag = dictStore.getTag(dict, cellValue);

    if (tag) {
      return (
        <el-tag type={tag} size="small">
          {label}
        </el-tag>
      );
    }
    return label;
  }

  return cellValue;
}
</script>

<template>
  <el-table-column v-if="operation" align="center" fixed="right" label="操作">
    <template #default="{ row }">
      <div class="flex justify-center gap-3">
        <slot :row="row"></slot>
      </div>
    </template>
  </el-table-column>
  <el-table-column v-else :formatter="formatter" />
</template>
