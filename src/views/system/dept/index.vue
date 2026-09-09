<script setup>
import { ElMessage } from 'element-plus';

import { getDept } from '@/api/system/dept.js';
import { buildTree, flattenTree } from '@/utils';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

async function request(params) {
  const { data } = await getDept(params);
  return { rows: data };
}

async function handleEdit(row, id) {
  tableRef.value.setLoading(true);
  try {
    const { data } = await exclude();
    const tree = buildTree(
      data.filter((e) => e.menuType !== 'F'),
      { idKey: 'menuId', rootId: 0 },
    );
    formDialogRef.value.open(row, tree, id);
  } finally {
    tableRef.value.setLoading(false);
  }
}

async function saveOrder() {
  const tableData = tableRef.value.getTableData();
  const menuIds = [];
  const orderNums = [];

  flattenTree(tableData).forEach((item) => {
    if (item.orderNum !== item._orderNum) {
      menuIds.push(item.menuId);
      orderNums.push(item._orderNum);
    }
  });

  tableRef.value.setLoading(true);
  try {
    const { code, msg } = await updateSort({ menuIds: menuIds.join(','), orderNums: orderNums.join(',') });
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
  <q-table row-key="deptId" :expand-row-keys="['100']" :pagination="{ hidden: true }" :request="request">
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
        <el-button v-if="row.menuType !== 'F'" type="primary" @click="handleEdit(null, row.menuId)" link>新增</el-button>
        <el-button type="primary" @click="handleEdit(row)" link>修改</el-button>
        <q-confirm :content="`菜单名称：${row.menuName}`" :request="() => deleteMenu(row.menuId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
