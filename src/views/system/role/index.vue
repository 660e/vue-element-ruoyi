<script setup>
import { treeselect, roleMenuTreeselect } from '@/api/system/menu.js';
import { getRole, deleteRole } from '@/api/system/role.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

function request(params) {
  if (params.createTime) {
    params.params = { beginTime: params.createTime[0], endTime: params.createTime[1] };
    delete params.createTime;
  }
  return getRole(params);
}

async function handleEdit(row) {
  tableRef.value.setLoading(true);
  try {
    if (row) {
      const { checkedKeys, menus } = await roleMenuTreeselect(row.roleId);
      formDialogRef.value.open({ row, tree: menus, checkedKeys });
    } else {
      const { data } = await treeselect();
      formDialogRef.value.open({ row, tree: data });
    }
  } finally {
    tableRef.value.setLoading(false);
  }
}
</script>

<template>
  <q-table :request="request" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="handleEdit()" plain>新增</el-button>
    </template>

    <q-column label="角色名称" prop="roleName" width="200" :config="{ filter: 'text' }" />
    <q-column label="权限字符" prop="roleKey" width="200" :config="{ filter: 'text' }" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable', filter: 'select' }" />
    <q-column label="备注" min-width="200" prop="remark" />
    <q-column
      label="创建时间"
      prop="createTime"
      width="200"
      :config="{ filter: 'date', props: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } }"
    />
    <q-column width="110" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="handleEdit(row)" link>修改</el-button>
        <q-confirm :content="`角色名称：${row.roleName}`" :request="() => deleteRole(row.roleId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
