<script setup>
import { getDeptList } from '@/api/system/dept.js';

async function request(params) {
  const { data } = await getDeptList(params);
  return { rows: data };
}
</script>

<template>
  <q-table row-key="deptId" :expand-row-keys="['100']" :pagination="{ hidden: true }" :request="request">
    <el-table-column label="机构名称" min-width="200" prop="deptName" :config="{ filter: 'text' }" />
    <el-table-column class-name="p-0!" label="排序" width="100">
      <template #default="{ row }">
        <el-input-number v-model="row._orderNum" class="w-full!" size="small" :controls="false" :precision="0" disabled-scientific />
      </template>
    </el-table-column>
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable', filter: 'select' }" />
    <q-column label="创建时间" prop="createTime" width="200" />
  </q-table>
</template>
