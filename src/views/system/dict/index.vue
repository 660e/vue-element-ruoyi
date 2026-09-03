<script setup>
import { getDictTypeList } from '@/api/system/dict.js';
</script>

<template>
  <q-table :request="getDictTypeList">
    <template #header>
      <div>
        <el-button type="primary" plain>新增</el-button>
        <el-button type="warning" plain>导出</el-button>
        <el-button type="danger" plain>刷新缓存</el-button>
      </div>
    </template>

    <q-column label="字典名称" prop="dictName" width="200" />
    <q-column label="字典类型" prop="dictType" width="200" />
    <q-column dict="sys_normal_disable" label="状态" prop="status" width="100" />
    <q-column label="备注" min-width="200" prop="remark" />
    <q-column label="创建时间" prop="createTime" width="200" />
    <q-column width="100" operation>
      <template #default="{ row }">
        <el-link type="primary">修改</el-link>
        <el-link type="danger">删除</el-link>
      </template>
    </q-column>
  </q-table>
</template>
