<script setup>
import { getUser, deleteUser, getUserById } from '@/api/system/user.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

function request(params) {
  return getUser({ ...params, deptId: 0 });
}

async function handleEdit(row) {
  tableRef.value.setLoading(true);
  try {
    const { data, roleIds, roles } = await getUserById(row?.userId || '');
    formDialogRef.value.open({ row: data, roleIds, roles });
  } finally {
    tableRef.value.setLoading(false);
  }
}
</script>

<template>
  <q-table :request="request" ref="tableRef">
    <template #prepend>
      <div class="w-60">prepend</div>
    </template>

    <template #header>
      <el-button type="primary" @click="handleEdit()" plain>新增</el-button>
    </template>

    <q-column label="用户名称" prop="userName" width="150" :config="{ filter: 'text' }" />
    <q-column label="用户昵称" prop="nickName" width="150" />
    <q-column label="部门" min-width="200" prop="deptName" />
    <q-column label="手机号码" prop="phonenumber" width="150" :config="{ filter: 'text' }" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable', filter: 'select' }" />
    <q-column
      label="创建时间"
      prop="createTime"
      width="200"
      :config="{ filter: 'date', props: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } }"
    />
    <q-column width="110" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="handleEdit(row)" link>修改</el-button>
        <q-confirm :content="`用户名称：${row.userName}`" :request="() => deleteUser(row.userId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
