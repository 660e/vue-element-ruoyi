<script setup>
import { useRestAttrs } from '@/hooks';

import FilterField from './FilterField.vue';

defineOptions({ name: 'QTable', inheritAttrs: false });

const { autoRequest, request, data } = defineProps({
  autoRequest: { type: Boolean, default: true },
  request: { type: Function, default: null },

  data: { type: Array, default: null },
});

const attrs = useRestAttrs();
const loading = ref(false);
const tableData = ref([]);

onMounted(() => {
  if (autoRequest) {
    fetchTableData();
  }
});

async function fetchTableData() {
  if (data) {
    tableData.value = data;
  } else if (request) {
    loading.value = true;
    try {
      const { rows } = await request();
      tableData.value = rows;
    } finally {
      loading.value = false;
    }
  } else {
    tableData.value = [];
  }
}
</script>

<template>
  <div :class="$attrs.class" :style="$attrs.style" class="q-table flex h-full">
    <slot name="prepend"></slot>

    <div class="flex flex-1 flex-col">
      <FilterField />
      <el-table v-loading="loading" v-bind="attrs" :data="tableData" height="100%" border>
        <el-table-column label="#" type="index" />
      </el-table>
      <div class="shrink-0">Pagination</div>
    </div>

    <slot name="append"></slot>
  </div>
</template>
