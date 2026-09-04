<script setup>
import { required } from '@/utils';

const visible = ref(true);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

function confirm() {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log(formData.value);
    }
  });
}
</script>

<template>
  <q-dialog v-model="visible" v-model:confirming="confirming" width="500" :title="formData.dictId ? '修改' : '新增'" @confirm="confirm">
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="字典名称" prop="dictName" :rules="[required]" />
      <q-item label="字典类型" prop="dictType" :rules="[required]" />
      <q-item label="状态" prop="status" :config="{ type: 'select', dict: 'sys_normal_disable' }" :rules="[required]" />
      <q-item label="备注" prop="remark" :config="{ type: 'textarea' }" />
    </el-form>
  </q-dialog>
</template>
