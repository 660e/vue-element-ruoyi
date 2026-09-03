<script setup>
import { getDeptList } from '@/api/system/dept.js';
</script>

<template>
  <q-table :pagination="{ rowsKey: 'data', hidden: true }" :request="getDeptList" row-key="deptId">
    <q-column label="部门名称" min-width="200" prop="deptName" />
    <q-column dict="sys_normal_disable" label="状态" prop="status" width="100" />
  </q-table>
</template>
