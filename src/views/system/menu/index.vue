<script setup>
import { getMenu, deleteMenu } from '@/api/system/menu.js';

// import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);

async function request(params) {
  const { data } = await getMenu(params);
  return { rows: data };
}
</script>

<template>
  <q-table row-key="menuId" :pagination="{ hidden: true }" :request="request" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="formDialogRef.open()" plain>新增</el-button>
    </template>

    <q-column label="菜单名称" prop="menuName" width="200" :config="{ filter: 'text' }" />
    <q-column label="类型" prop="menuType" width="100" :config="{ dict: 'sys_menu_type' }" />
    <q-column label="排序" prop="orderNum" width="100" />
    <q-column label="权限标识" prop="perms" width="200" />
    <q-column label="组件路径" min-width="200" prop="component" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable', filter: 'select' }" />
    <q-column width="110" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="formDialogRef.open(row)" link>修改</el-button>
        <q-confirm :content="`菜单名称：${row.menuName}`" :request="() => deleteMenu(row.menuId)" @confirm="tableRef.refresh()" />
      </template>
    </q-column>
  </q-table>

  <!-- <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" /> -->
</template>
