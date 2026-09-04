<script setup>
import { getDeptList } from '@/api/system/dept.js';
</script>

<template>
  <q-table row-key="deptId" :expand-row-keys="['100']" :pagination="{ rowsKey: 'data', hidden: true }" :request="getDeptList">
    <q-column label="机构名称" min-width="200" prop="deptName" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_normal_disable' }" />
    <q-column label="创建时间" prop="createTime" width="200" />
  </q-table>
</template>
