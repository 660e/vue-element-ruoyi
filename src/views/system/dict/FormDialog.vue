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
  <q-dialog v-model="visible" v-model:confirming="confirming" :title="formData.dictId ? '修改' : '新增'" @confirm="confirm" width="500">
    <el-form :model="formData" label-position="top" ref="formRef">
      <q-item :rules="[required]" label="字典名称" prop="dictName" />
      <q-item :rules="[required]" label="字典类型" prop="dictType" />
      <q-item :config="{ type: 'select', dict: 'sys_normal_disable' }" :rules="[required]" label="状态" prop="status" />
      <q-item :config="{ type: 'textarea' }" label="备注" prop="remark" />
    </el-form>
  </q-dialog>
</template>
