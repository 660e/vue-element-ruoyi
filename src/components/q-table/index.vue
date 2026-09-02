<script setup>
import { useRestAttrs } from '@/hooks';

import FilterField from './FilterField.vue';

defineOptions({ name: 'QTable', inheritAttrs: false });

const attrs = useRestAttrs();
const { autoRequest, paginationProps, request, data } = defineProps({
  autoRequest: { type: Boolean, default: true },
  paginationProps: {
    type: Object,
    default: () => ({
      hidden: false,
      layout: ['total', 'sizes', 'prev', 'pager', 'next'],
      page: 1,
      pageKey: 'pageNum',
      pageSizes: [10, 20, 50, 100],
      size: 10,
      sizeKey: 'pageSize',
    }),
  },
  request: { type: Function, default: null },

  data: { type: Array, default: null },
});

const loading = ref(false);
const tableData = ref([]);
const queryParams = reactive({});
const pagination = reactive({ page: paginationProps.page, size: paginationProps.size, total: 0 });

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
    queryParams[pageKey] = pagination.page;
    queryParams[sizeKey] = pagination.size;

    loading.value = true;
    try {
      const { rows, total } = await request(queryParams);
      tableData.value = rows;
      pagination.total = total;
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
      <div v-if="!paginationProps.hidden" class="shrink-0">
        <el-pagination
          v-model:current-page="pagination.page"
          :layout="paginationProps.layout.join(',')"
          :page-size="pagination.size"
          :page-sizes="paginationProps.pageSizes"
          :total="pagination.total"
          @current-change="fetchTableData"
          @size-change="fetchTableData"
          size="small"
          background
        />
      </div>
    </div>

    <slot name="append"></slot>
  </div>
</template>
