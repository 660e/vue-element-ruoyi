<script setup>
import { useRestAttrs } from '@/hooks';

import FilterField from './FilterField.vue';

defineOptions({ name: 'QTable', inheritAttrs: false });

const defaultPaginationProps = {
  page: 1,
  size: 10,
  pageKey: 'pageNum',
  sizeKey: 'pageSize',
  hidden: false,
  layout: ['total', 'sizes', 'prev', 'pager', 'next'],
  pageSizes: [10, 20, 50, 100],
};

const attrs = useRestAttrs();
const { autoRequest, pagination, request } = defineProps({
  autoRequest: { type: Boolean, default: true },
  pagination: { type: Object },
  request: { type: Function },
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
  if (request) {
    const { pageKey, sizeKey, hidden } = paginationProps;
    const params = { ...queryParams };

    if (!hidden) {
      params[pageKey] = paginationData.page;
      params[sizeKey] = paginationData.size;
    }

    loading.value = true;
    try {
      const { rows, total } = await request(params);
      tableData.value = rows;

      if (!hidden) {
        paginationData.total = total;
      }
    } finally {
      loading.value = false;
    }
  }
}

defineExpose({
  refresh: fetchTableData,
  setLoading: (value) => (loading.value = value),
});
</script>

<template>
  <div class="q-table flex h-full" :class="$attrs.class" :style="$attrs.style">
    <slot name="prepend"></slot>

    <div class="q-table-wrapper flex flex-1 flex-col gap-3 overflow-auto p-3">
      <FilterField v-model="queryParams" :parent-slots="$slots" @search="fetchTableData" />

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
          v-model:page-size="paginationData.size"
          :layout="paginationProps.layout.join(',')"
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
