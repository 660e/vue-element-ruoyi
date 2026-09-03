<script setup>
import { required } from '@/utils';

const visible = ref(true);
const formRef = ref(null);
const formData = ref({});
</script>

<template>
  <q-dialog v-model="visible" title="title" width="500">
    <el-form ref="formRef" :model="formData">
      <el-form-item label="Activity name" label-position="top" :rules="[required]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="Activity name" :rules="[required]">
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-form>
  </q-dialog>
</template>
