<script setup>
import { required } from '@/utils';

const formData = ref({});
</script>

<template>
  <div class="w-150 pt-50 pl-50">
    <el-form :model="formData">
      <el-form-item label="name1" label-position="top" prop="name1" :rules="[required]">
        <el-input v-model="formData.name1" />
      </el-form-item>
      <q-item label="name2" label-position="top" prop="name2" :rules="[required]" />

      <el-form-item label="name3" prop="name3" :rules="[required]">
        <el-input v-model="formData.name3" />
      </el-form-item>
      <q-item label="name4" prop="name4" :rules="[required]" />
    </el-form>
  </div>
</template>
