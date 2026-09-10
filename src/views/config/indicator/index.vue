<script setup>
import { getCategoryTree } from '@/api/assessment/category.js';
import { getScoreTable, deleteScoreTable } from '@/api/assessment/scoreTable.js';
import { getTemplate } from '@/api/assessment/template.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

async function handleEdit(row) {
  tableRef.value.setLoading(true);
  try {
    const { data: categoryTree } = await getCategoryTree();
    const { rows: templateList } = await getTemplate();
    formDialogRef.value.open({ row, categoryTree, templateList });
  } finally {
    tableRef.value.setLoading(false);
  }
}
</script>

<template>
  <q-table :request="getScoreTable" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="handleEdit()" plain>新增</el-button>
    </template>

    <q-column label="评分表名称" min-width="200" prop="tableName" :config="{ filter: 'text' }" />
    <q-column label="权重" prop="weight" width="100" />
    <q-column label="煤矿类型" prop="mineType" width="100" :config="{ filter: 'select', dict: 'mine_type' }" />
    <q-column label="排序" prop="sortOrder" width="100" />
    <q-column label="所属模板" min-width="200" prop="templateName" />
    <q-column label="专业大类" min-width="200" prop="categoryName" />
    <q-column width="110" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="handleEdit(row)" link>修改</el-button>
        <q-confirm :content="`评分表名称：${row.tableName}`" :request="() => deleteScoreTable(row.scoreTableId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
