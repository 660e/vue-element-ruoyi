<script setup>
import { ElMessage } from 'element-plus';

import { getDept, deleteDept, updateSort, getExclude } from '@/api/system/dept.js';
import { buildTree, flattenTree } from '@/utils';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

async function request(params) {
  const { data } = await getDept(params);
  const rows = flattenTree(data).map((e) => ({ ...e, _orderNum: e.orderNum }));
  return { rows: buildTree(rows, { idKey: 'deptId', rootId: 0 }) };
}

async function handleEdit(row, id) {
  tableRef.value.setLoading(true);
  try {
    const { data } = await (row ? getExclude(row.deptId) : getDept());
    formDialogRef.value.open({ row, tree: data, parentId: id });
  } finally {
    tableRef.value.setLoading(false);
  }
}

async function saveOrder() {
  const tableData = tableRef.value.getTableData();
  const deptIds = [];
  const orderNums = [];

  flattenTree(tableData).forEach((item) => {
    if (item.orderNum !== item._orderNum) {
      deptIds.push(item.deptId);
      orderNums.push(item._orderNum);
    }
  });

  tableRef.value.setLoading(true);
  try {
    const { code, msg } = await updateSort({ deptIds: deptIds.join(','), orderNums: orderNums.join(',') });
    if (code === 200) {
      tableRef.value.refresh();
      ElMessage.success(msg);
    }
  } finally {
    tableRef.value.setLoading(false);
  }
}
</script>

<template>
  <q-table row-key="deptId" :expand-row-keys="['100']" :pagination="{ hidden: true }" :request="request" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="handleEdit()" plain>新增</el-button>
      <el-button type="warning" @click="saveOrder" plain>保存排序</el-button>
    </template>

    <el-table-column label="机构名称" min-width="200" prop="deptName" :config="{ filter: 'text' }" />
    <el-table-column class-name="p-0!" label="排序" width="100">
      <template #default="{ row }">
        <el-input-number v-model="row._orderNum" class="w-full!" size="small" :controls="false" :precision="0" disabled-scientific />
      </template>
    </el-table-column>
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable', filter: 'select' }" />
    <q-column label="创建时间" prop="createTime" width="200" />

    <q-column width="150" operation>
      <template #default="{ row }">
        <el-button v-if="row.menuType !== 'F'" type="primary" @click="handleEdit(null, row.deptId)" link>新增</el-button>
        <el-button type="primary" @click="handleEdit(row)" link>修改</el-button>
        <q-confirm :content="`机构名称：${row.deptName}`" :request="() => deleteDept(row.deptId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
