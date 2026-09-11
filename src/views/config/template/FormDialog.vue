<script setup>
import { ElMessage } from 'element-plus';

import { createTemplate, updateTemplate } from '@/api/assessment/template.js';
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
      const request = formData.value.templateId ? updateTemplate : createTemplate;
      try {
        const { code, msg } = await request({ ...formData.value });
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
    :title="formData.templateId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="模板名称" prop="templateName" :rules="[required]" />
      <q-item label="煤矿类型" prop="mineType" :config="{ type: 'select', dict: 'mine_type' }" :rules="[required]" />
      <q-item label="生效日期" prop="effectiveDate" :config="{ type: 'date' }" />
      <q-item label="失效日期" prop="expireDate" :config="{ type: 'date' }" />
    </el-form>
  </q-dialog>
</template>
