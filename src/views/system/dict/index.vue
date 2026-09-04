<script setup>
import { getDictTypeList } from '@/api/system/dict.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);
</script>

<template>
  <q-table :request="getDictTypeList" ref="tableRef">
    <template #header>
      <div>
        <el-button type="primary" @click="formDialogRef.open()" plain>新增</el-button>
        <q-confirm :button="{ link: false, plain: true }" @confirm="tableRef.refresh()" />
      </div>
    </template>

    <q-column label="字典名称" prop="dictName" width="200" />
    <q-column label="字典类型" prop="dictType" width="200" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable' }" />
    <q-column label="备注" min-width="200" prop="remark" />
    <q-column label="创建时间" prop="createTime" width="200" />
    <q-column width="120" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="formDialogRef.open(row)" link>修改</el-button>
        <q-confirm @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <form-dialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
