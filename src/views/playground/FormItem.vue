<script setup>
import { required } from '@/utils';

const formData = ref({});
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <el-form class="w-100" label-width="150" :model="formData">
      <el-form-item label="top" label-position="top" prop="top" :rules="[required]">
        <el-input v-model="formData.top" />
      </el-form-item>
      <q-item label="top" label-position="top" prop="top" :rules="[required]" />

      <el-form-item label="left" label-position="left" prop="left" :rules="[required]">
        <el-input v-model="formData.left" />
      </el-form-item>
      <q-item label="left" label-position="left" prop="left" :rules="[required]" />

      <el-form-item label="right" label-position="right" prop="right" :rules="[required]">
        <el-input v-model="formData.right" />
      </el-form-item>
      <q-item label="right" label-position="right" prop="right" :rules="[required]" />
    </el-form>
  </div>
</template>
