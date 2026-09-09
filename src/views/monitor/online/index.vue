<script setup>
import dayjs from 'dayjs';

import { getOnline, deleteOnline } from '@/api/monitor/online.js';

const tableRef = ref(null);
</script>

<template>
  <q-table :request="getOnline" ref="tableRef">
    <q-column label="登录名称" prop="userName" width="200" :config="{ filter: 'text' }" />
    <q-column label="登录IP" prop="ipaddr" width="200" :config="{ filter: 'text' }" />
    <el-table-column label="登录时间" width="200" :formatter="(row) => dayjs(row.loginTime).format('YYYY-MM-DD HH:mm:ss')" />
    <q-column label="登录地点" prop="loginLocation" width="200" />
    <q-column label="部门名称" prop="deptName" width="200" />
    <q-column label="操作系统" prop="os" width="200" />
    <q-column label="浏览器" prop="browser" width="200" />
    <q-column label="会话编号" min-width="400" prop="tokenId" />
    <q-column width="70" operation>
      <template #default="{ row }">
        <q-confirm
          message="是否强制该用户下线？"
          text="下线"
          :content="`用户名称：${row.userName}`"
          :request="() => deleteOnline(row.tokenId)"
          @confirm="tableRef.refresh()"
        />
      </template>
    </q-column>
  </q-table>
</template>
