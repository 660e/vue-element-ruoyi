<script setup>
import { getDictDataList, deleteDictData } from '@/api/system/dict.js';

import DataFormDialog from './DataFormDialog.vue';

const visible = ref(false);
const rowData = ref({});
const tableRef = ref(null);
const formDialogRef = ref(null);

function open(row) {
  rowData.value = row;
  visible.value = true;
}

defineExpose({ open });
</script>

<template>
  <q-dialog v-model="visible" width="1000" :title="rowData.dictName" @cancel="visible = false">
    <q-table :request="(p) => getDictDataList({ ...p, dictType: rowData.dictType })" ref="tableRef">
      <template #header>
        <el-button type="primary" @click="formDialogRef.open({ dictType: rowData.dictType })" plain>新增</el-button>
      </template>

      <q-column label="字典标签" min-width="100" prop="dictLabel" />
      <q-column label="字典键值" min-width="100" prop="dictValue" />
      <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable' }" />
      <q-column label="备注" min-width="200" prop="remark" />
      <q-column label="创建时间" prop="createTime" width="200" />
      <q-column width="110" operation>
        <template #default="{ row }">
          <el-button type="primary" @click="formDialogRef.open(row)" link>修改</el-button>
          <q-confirm :content="`字典标签：${row.dictLabel}`" :request="() => deleteDictData(row.dictCode)" @confirm="tableRef.refresh()" />
        </template>
      </q-column>
    </q-table>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
    </template>

    <DataFormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
  </q-dialog>
</template>

<style scoped>
.q-table :deep(.q-table-wrapper) {
  padding: 0;
}
</style>
