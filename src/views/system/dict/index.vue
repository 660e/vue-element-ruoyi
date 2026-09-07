<script setup>
import { getDictTypeList, deleteDictType } from '@/api/system/dict.js';

import DataListDialog from './DataListDialog.vue';
import TypeFormDialog from './TypeFormDialog.vue';

const tableRef = ref(null);
const typeFormDialogRef = ref(null);
const dataListDialogRef = ref(null);
</script>

<template>
  <q-table :request="getDictTypeList" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="typeFormDialogRef.open()" plain>新增</el-button>
    </template>

    <q-column label="字典名称" prop="dictName" width="200" />
    <q-column label="字典类型" prop="dictType" width="200" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable' }" />
    <q-column label="备注" min-width="200" prop="remark" />
    <q-column label="创建时间" prop="createTime" width="200" />
    <q-column width="150" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="typeFormDialogRef.open(row)" link>修改</el-button>
        <el-button type="primary" @click="dataListDialogRef.open(row)" link>列表</el-button>
        <q-confirm :content="`字典名称：${row.dictName}`" :request="() => deleteDictType(row.dictId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <TypeFormDialog @confirm="tableRef.refresh()" ref="typeFormDialogRef" />
  <DataListDialog ref="dataListDialogRef" />
</template>
