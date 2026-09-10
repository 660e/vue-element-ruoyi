<script setup>
import { getTemplate, deleteTemplate } from '@/api/assessment/template.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);
</script>

<template>
  <q-table :request="getTemplate" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="formDialogRef.open()" plain>新增</el-button>
    </template>

    <q-column label="模板名称" min-width="200" prop="templateName" :config="{ filter: 'text' }" />
    <q-column label="煤矿类型" prop="mineType" width="100" :config="{ filter: 'select', dict: 'mine_type' }" />
    <q-column label="模板状态" prop="templateStatus" width="100" />
    <q-column label="版本" prop="templateVersion" width="100" />
    <q-column label="生效日期" prop="effectiveDate" width="200" />
    <q-column label="失效日期" prop="expireDate" width="200" />
    <q-column width="110" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="formDialogRef.open(row)" link>修改</el-button>
        <q-confirm :content="`模板名称：${row.templateName}`" :request="() => deleteTemplate(row.templateId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
