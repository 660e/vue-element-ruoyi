<script setup>
import { getDictTypeList } from '@/api/system/dict.js';
</script>

<template>
  <q-table :request="getDictTypeList">
    <q-column label="字典名称" prop="dictName" width="200" />
    <q-column label="字典类型" prop="dictType" width="200" />
    <q-column dict="sys_normal_disable" label="状态" prop="status" width="100" />
    <q-column label="备注" min-width="200" prop="remark" />
    <q-column label="创建时间" prop="createTime" width="200" />
  </q-table>
</template>
