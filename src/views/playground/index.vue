<script setup>
import { required } from '@/utils';

const formData = ref({});
</script>

<template>
  <div class="w-150 pt-20 pl-50">
    <el-form :model="formData">
      <el-form-item label="name" label-position="top" prop="name" :rules="[required]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <q-item label="name" label-position="top" prop="name" :rules="[required]" />

      <el-form-item label="name" label-position="left" label-width="150" prop="name" :rules="[required]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <q-item label="name" label-position="left" label-width="150" prop="name" :rules="[required]" />

      <el-form-item label="name" label-position="right" label-width="150" prop="name" :rules="[required]">
        <el-input v-model="formData.name" />
      </el-form-item>
      <q-item label="name" label-position="right" label-width="150" prop="name" :rules="[required]" />
    </el-form>
  </div>
</template>
