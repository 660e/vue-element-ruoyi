<script setup>
import { ElMessage } from 'element-plus';

import { createJob, updateJob } from '@/api/monitor/job.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

function open(row) {
  formData.value = row ? { ...row } : {};
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.jobId ? updateJob : createJob;
      try {
        const { code, msg } = await request(formData.value);
        if (code === 200) {
          ElMessage.success(msg);
          emit('confirm');
          visible.value = false;
        }
      } finally {
        confirming.value = false;
      }
    }
  });
}

defineExpose({ open });
</script>

<template>
  <q-dialog
    v-model="visible"
    v-model:confirming="confirming"
    width="400"
    :title="formData.jobId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="任务名称" prop="jobName" :rules="[required]" />
      <q-item label="任务组名" prop="jobGroup" :config="{ type: 'select', dict: 'sys_job_group' }" :rules="[required]" />
      <q-item label="调用目标字符串" prop="invokeTarget" :config="{ type: 'textarea' }" :rules="[required]" />
      <q-item label="cron执行表达式" prop="cronExpression" :config="{ type: 'textarea' }" :rules="[required]" />
      <q-item label="执行策略" prop="misfirePolicy" :config="{ type: 'radio', dict: 'sys_misfire_policy' }" :rules="[required]" />
      <q-item label="是否并发" prop="concurrent" :config="{ type: 'radio', dict: 'sys_concurrent' }" :rules="[required]" />
    </el-form>
  </q-dialog>
</template>
