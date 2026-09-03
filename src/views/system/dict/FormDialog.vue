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
  <q-dialog v-model="visible" v-model:confirming="confirming" @confirm="confirm" title="title" width="500">
    <el-form ref="formRef" :model="formData">
      <el-form-item label="name1" label-position="top" prop="name1" :rules="[required]">
        <el-input v-model="formData.name1" />
      </el-form-item>
      <el-form-item label="name2" prop="name2" :rules="[required]">
        <el-input v-model="formData.name2" />
      </el-form-item>
      <q-item label="name3" label-position="top" prop="name3" :rules="[required]" />
    </el-form>
  </q-dialog>
</template>
