<script setup>
import { getDictTypeList } from '@/api/system/dict.js';
</script>

<template>
  <q-table :request="getDictTypeList">
    <q-column label="字典名称" prop="dictName" width="500" />
    <q-column label="字典类型" prop="dictType" width="500" />
    <q-column label="状态" prop="status" width="500" />
    <q-column label="备注" prop="remark" width="500" />
    <q-column label="创建时间" prop="createTime" width="500" />
  </q-table>
</template>
