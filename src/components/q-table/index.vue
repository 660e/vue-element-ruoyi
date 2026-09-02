<script setup>
import { useRestAttrs } from '@/hooks';

import FilterField from './FilterField.vue';

defineOptions({ name: 'QTable', inheritAttrs: false });

const defaultPaginationProps = {
  page: 1,
  size: 20,
  pageKey: 'pageNum',
  sizeKey: 'pageSize',
  hidden: false,
  layout: ['total', 'sizes', 'prev', 'pager', 'next'],
  pageSizes: [10, 20, 50, 100],
};

const attrs = useRestAttrs();
const { autoRequest, pagination, request, data } = defineProps({
  autoRequest: { type: Boolean, default: true },
  gap: { type: Number, default: 3 },
  pagination: { type: Object, default: () => ({}) },
  request: { type: Function, default: null },

  data: { type: Array, default: null },
});

const loading = ref(false);
const tableData = ref([]);
const queryParams = reactive({});
const paginationProps = reactive({ ...defaultPaginationProps, ...pagination });
const paginationData = reactive({ page: paginationProps.page, size: paginationProps.size, total: 0 });

onMounted(() => {
  if (autoRequest) {
    fetchTableData();
  }
});

async function fetchTableData() {
  if (data) {
    tableData.value = data;
  } else if (request) {
    const { pageKey, sizeKey } = paginationProps;
    queryParams[pageKey] = paginationData.page;
    queryParams[sizeKey] = paginationData.size;

    loading.value = true;
    try {
      const { rows, total } = await request(queryParams);
      tableData.value = rows;
      paginationData.total = total;
    } finally {
      loading.value = false;
    }
  } else {
    tableData.value = [];
  }
}
</script>

<template>
  <div
    :class="$attrs.class"
    :style="{ gap: `calc(var(--spacing) * ${gap})`, padding: `calc(var(--spacing) * ${gap})`, ...$attrs.style }"
    class="q-table flex h-full"
  >
    <slot name="prepend"></slot>

    <div :style="{ gap: `calc(var(--spacing) * ${gap})` }" class="flex flex-1 flex-col">
      <FilterField />
      <el-table v-loading="loading" v-bind="attrs" :data="tableData" height="100%" border>
        <el-table-column
          :index="(index) => (paginationData.page - 1) * paginationData.size + index + 1"
          align="center"
          fixed="left"
          label="#"
          type="index"
          width="60"
        />
      </el-table>
      <div v-if="!paginationProps.hidden" class="flex shrink-0 justify-end">
        <el-pagination
          v-model:current-page="paginationData.page"
          :layout="paginationProps.layout.join(',')"
          :page-size="paginationData.size"
          :page-sizes="paginationProps.pageSizes"
          :total="paginationData.total"
          @current-change="fetchTableData"
          @size-change="fetchTableData"
          background
        />
      </div>
    </div>

    <slot name="append"></slot>
  </div>
</template>
