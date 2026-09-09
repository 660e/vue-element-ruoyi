<script setup>
import { getJob, deleteJob, runJob } from '@/api/monitor/job.js';

import FormDialog from './FormDialog.vue';

const tableRef = ref(null);
const formDialogRef = ref(null);
</script>

<template>
  <q-table :request="getJob" ref="tableRef">
    <template #header>
      <el-button type="primary" @click="formDialogRef.open()" plain>新增</el-button>
    </template>

    <q-column label="任务名称" min-width="200" prop="jobName" :config="{ filter: 'text' }" />
    <q-column label="任务组名" prop="jobGroup" width="100" :config="{ filter: 'select', dict: 'sys_job_group' }" />
    <q-column label="调用目标字符串" min-width="200" prop="invokeTarget" />
    <q-column label="cron执行表达式" min-width="200" prop="cronExpression" />
    <q-column label="状态" prop="status" width="100" :config="{ dict: 'sys_job_status', filter: 'select' }" />
    <q-column width="180" operation>
      <template #default="{ row }">
        <el-button type="primary" @click="formDialogRef.open(row)" link>修改</el-button>
        <q-confirm :content="`任务名称：${row.jobName}`" :request="() => deleteJob(row.jobId)" @confirm="tableRef.refresh()" />
        <q-confirm
          message="是否立即执行当前任务？"
          text="执行一次"
          :button="{ type: 'warning' }"
          :content="`任务名称：${row.jobName}`"
          :request="() => runJob({ jobGroup: row.jobGroup, jobId: row.jobId })"
          @confirm="tableRef.refresh()"
        />
      </template>
    </q-column>
  </q-table>

  <FormDialog @confirm="tableRef.refresh()" ref="formDialogRef" />
</template>
