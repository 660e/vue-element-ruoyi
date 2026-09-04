<script setup>
import { required } from '@/utils';

const formData = ref({});
</script>

<template>
  <div class="flex h-screen items-center justify-center gap-12">
    <el-form :model="formData" class="w-100" label-width="150">
      <el-form-item :rules="[required]" label="标题" label-position="top" prop="top">
        <el-input v-model="formData.top" />
      </el-form-item>
      <q-item :rules="[required]" hint="This is a hint" label="标题" label-position="top" prop="top" />
      <q-item hint="This is a hint" label="标题" label-position="top" prop="top" />

      <el-form-item :rules="[required]" label="标题" label-position="left" prop="left">
        <el-input v-model="formData.left" />
      </el-form-item>
      <q-item :rules="[required]" hint="This is a hint" label="标题" label-position="left" prop="left" />
      <q-item hint="This is a hint" label="标题" label-position="left" prop="left" />

      <el-form-item :rules="[required]" label="标题" label-position="right" prop="right">
        <el-input v-model="formData.right" />
      </el-form-item>
      <q-item :rules="[required]" hint="This is a hint" label="标题" label-position="right" prop="right" />
      <q-item hint="This is a hint" label="标题" label-position="right" prop="right" />
    </el-form>

    <el-form :model="formData" class="w-100" label-width="100">
      <q-item :config="{ maxlength: 4, onInput: (value) => console.log(value) }" label="text" prop="text" />
      <q-item :config="{ type: 'textarea', maxlength: 4 }" label="textarea" prop="textarea" />
      <q-item :config="{ type: 'password', maxlength: 4, showPassword: true }" label="password" prop="password" />
      <q-item :config="{ type: 'number', min: 0, max: 100 }" label="number" prop="number" />
      <q-item :config="{ type: 'select', dict: 'sys_normal_disable' }" label="select" prop="select" />
    </el-form>

    <pre>{{ formData }}</pre>
  </div>
</template>
