<script setup>
import { required } from '@/utils';

const formData = ref({});
</script>

<template>
  <div class="flex h-screen items-center justify-center gap-12">
    <el-form class="w-100" label-width="150" :model="formData">
      <el-form-item label="标题" label-position="top" prop="top" :rules="[required]">
        <el-input v-model="formData.top" />
      </el-form-item>
      <q-item hint="This is a hint" label="标题" label-position="top" prop="top" :rules="[required]" />
      <q-item hint="This is a hint" label="标题" label-position="top" prop="top" />

      <el-form-item label="标题" label-position="left" prop="left" :rules="[required]">
        <el-input v-model="formData.left" />
      </el-form-item>
      <q-item hint="This is a hint" label="标题" label-position="left" prop="left" :rules="[required]" />
      <q-item hint="This is a hint" label="标题" label-position="left" prop="left" />

      <el-form-item label="标题" label-position="right" prop="right" :rules="[required]">
        <el-input v-model="formData.right" />
      </el-form-item>
      <q-item hint="This is a hint" label="标题" label-position="right" prop="right" :rules="[required]" />
      <q-item hint="This is a hint" label="标题" label-position="right" prop="right" />
    </el-form>

    <el-form class="w-100" label-width="100" :model="formData">
      <q-item label="text" prop="text" :config="{ maxlength: 4, onInput: (value) => console.log(value) }" />
      <q-item label="textarea" prop="textarea" :config="{ type: 'textarea', maxlength: 4 }" />
      <q-item label="password" prop="password" :config="{ type: 'password', maxlength: 4, showPassword: true }" />
      <q-item label="number" prop="number" :config="{ type: 'number', min: 0, max: 100 }" />
      <q-item label="select" prop="select" :config="{ type: 'select', dict: 'sys_normal_disable' }" />
      <q-item label="date" prop="date" :config="{ type: 'date' }" />
      <q-item label="month" prop="month" :config="{ type: 'month' }" />
      <q-item label="year" prop="year" :config="{ type: 'year' }" />
    </el-form>

    <pre>{{ formData }}</pre>
  </div>
</template>
