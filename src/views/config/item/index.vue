<script setup>
import { getCategoryTree, deleteCategory } from '@/api/assessment/category.js';
import { getDraftTemplate } from '@/api/assessment/template.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

async function request(params) {
  const { data } = await getCategoryTree(params);
  return { rows: data };
}

async function handleEdit(row, id) {
  tableRef.value.setLoading(true);
  try {
    const { data: categoryTree } = await getCategoryTree();
    const { data: templateList } = await getDraftTemplate();
    formDialogRef.value.open({ row, categoryTree, templateList, parentId: id });
  } finally {
    tableRef.value.setLoading(false);
  }
}
</script>

<template>
  <q-table row-key="categoryId" :pagination="{ hidden: true }" :request="request" ref="tableRef" default-expand-all>
    <template #header>
      <el-button type="primary" @click="handleEdit()" plain>新增</el-button>
    </template>

    <el-table-column label="分类名称" min-width="200" prop="categoryName" :config="{ filter: 'text' }" />
    <q-column label="分类编码" min-width="200" prop="categoryCode" :config="{ filter: 'text' }" />
    <q-column label="权重" prop="weight" width="100" />
    <q-column label="是否加分项" prop="bonus" width="100" :config="{ filter: 'select', dict: 'yes_no' }" />
    <q-column label="标准分值" prop="standardScore" width="100" />
    <q-column label="显示顺序" prop="sortOrder" width="100" />
    <q-column label="所属模版" min-width="200" prop="templateName" />
    <q-column width="150" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="handleEdit(null, row.categoryId)" link>新增</el-button>
        <el-button type="primary" @click="handleEdit(row)" link>修改</el-button>
        <q-confirm :content="`分类名称：${row.categoryName}`" :request="() => deleteCategory(row.categoryId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
