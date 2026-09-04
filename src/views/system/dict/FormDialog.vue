<script setup>
import { ElMessage } from 'element-plus';

import { createDictType, updateDictType } from '@/api/system/dict.js';
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
      const request = formData.value.dictId ? updateDictType : createDictType;
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
    width="500"
    :title="formData.dictId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="字典名称" prop="dictName" :rules="[required]" />
      <q-item label="字典类型" prop="dictType" :rules="[required]" />
      <q-item label="状态" prop="status" :config="{ type: 'select', dict: 'sys_normal_disable' }" :rules="[required]" />
      <q-item label="备注" prop="remark" :config="{ type: 'textarea' }" />
    </el-form>
  </q-dialog>
</template>
