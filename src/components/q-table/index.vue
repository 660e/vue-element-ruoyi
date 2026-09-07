<script setup>
import { useRestAttrs } from '@/hooks';

import FilterField from './FilterField.vue';

defineOptions({ name: 'QTable', inheritAttrs: false });

const defaultPaginationProps = {
  page: 1,
  size: 10,
  pageKey: 'pageNum',
  sizeKey: 'pageSize',
  rowsKey: 'rows',
  totalKey: 'total',
  hidden: false,
  layout: ['total', 'sizes', 'prev', 'pager', 'next'],
  pageSizes: [10, 20, 50, 100],
};

const attrs = useRestAttrs();
const { autoRequest, pagination, request, data } = defineProps({
  autoRequest: { type: Boolean, default: true },
  pagination: { type: Object },
  request: { type: Function },

  data: { type: Array },
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
    const { pageKey, sizeKey, rowsKey, totalKey, hidden } = paginationProps;

    if (!hidden) {
      queryParams[pageKey] = paginationData.page;
      queryParams[sizeKey] = paginationData.size;
    }

    loading.value = true;
    try {
      const { [rowsKey]: rows, [totalKey]: total } = await request(queryParams);
      tableData.value = rows;

      if (!hidden) {
        paginationData.total = total;
      }
    } finally {
      loading.value = false;
    }
  } else {
    tableData.value = [];
  }
}

defineExpose({
  refresh: fetchTableData,
});
</script>

<template>
  <div class="q-table flex h-full gap-3 p-3" :class="$attrs.class" :style="$attrs.style">
    <slot name="prepend"></slot>

    <div class="flex flex-1 flex-col gap-3">
      <FilterField />

      <div v-if="$slots.header">
        <slot name="header"></slot>
      </div>

      <el-table
        v-loading="loading"
        class="flex-1"
        height="100%"
        :data="tableData"
        :header-cell-style="{ backgroundColor: 'var(--el-fill-color-light)' }"
        border
        show-overflow-tooltip
        v-bind="attrs"
      >
        <el-table-column
          align="center"
          fixed="left"
          label="#"
          type="index"
          width="70"
          :index="(index) => (paginationData.page - 1) * paginationData.size + index + 1"
        />
        <slot></slot>
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
