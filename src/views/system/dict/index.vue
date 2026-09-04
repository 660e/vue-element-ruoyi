<script setup>
import { getDictTypeList } from '@/api/system/dict.js';

import FormDialog from './FormDialog.vue';

const formDialogRef = ref(null);
</script>

<template>
  <q-table :request="getDictTypeList">
    <template #header>
      <div>
        <el-button type="primary" @click="formDialogRef.open()" plain>新增</el-button>
      </div>
    </template>

    <q-column label="字典名称" prop="dictName" width="200" />
    <q-column label="字典类型" prop="dictType" width="200" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable' }" />
    <q-column label="备注" min-width="200" prop="remark" />
    <q-column label="创建时间" prop="createTime" width="200" />
    <q-column width="100" operation>
      <template #default="{ row }">
        <el-link type="primary" @click="formDialogRef.open(row)">修改</el-link>
        <el-link type="danger">删除</el-link>
      </template>
    </q-column>
  </q-table>

  <form-dialog ref="formDialogRef" />
</template>
