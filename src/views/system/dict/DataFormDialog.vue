<script setup>
import { ElMessage } from 'element-plus';

import { createDictData, updateDictData } from '@/api/system/dict.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

function open(row) {
  formData.value = { ...row };
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.dictCode ? updateDictData : createDictData;
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
    :title="formData.dictCode ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="字典类型" prop="dictType" :config="{ disabled: true }" />
      <q-item label="数据标签" prop="dictLabel" :rules="[required]" />
      <q-item label="数据键值" prop="dictValue" :rules="[required]" />
      <q-item label="排序" prop="dictSort" :config="{ type: 'number' }" :rules="[required]" />
      <q-item label="标签类型" prop="listClass" :config="{ type: 'select', dict: 'sys_tag_type' }" />
      <q-item label="状态" prop="status" :config="{ type: 'select', dict: 'sys_normal_disable' }" :rules="[required]" />
      <q-item label="备注" prop="remark" :config="{ type: 'textarea' }" />
    </el-form>
  </q-dialog>
</template>
