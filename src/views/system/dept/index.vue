<script setup>
import { getDeptList } from '@/api/system/dept.js';
</script>

<template>
  <q-table :expand-row-keys="['100']" :pagination="{ rowsKey: 'data', hidden: true }" :request="getDeptList" row-key="deptId">
    <q-column label="机构名称" min-width="200" prop="deptName" />
    <q-column dict="sys_normal_disable" label="状态" prop="status" width="100" />
    <q-column label="创建时间" prop="createTime" width="200" />
  </q-table>
</template>
