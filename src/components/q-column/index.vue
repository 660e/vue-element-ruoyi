<script setup lang="jsx">
import { useDictStore } from '@/stores';

defineOptions({ name: 'QColumn' });

const { config } = defineProps({
  config: { type: Object },
  operation: { type: Boolean },
});

const dictStore = useDictStore();

function formatter(_, __, cellValue) {
  if (config?.dict) {
    const label = dictStore.getLabel(config.dict, cellValue);
    const tag = dictStore.getTag(config.dict, cellValue);

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
