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
      <q-item :props="{ maxlength: 4 }" label="text" prop="text" type="text" />
      <q-item :props="{ maxlength: 4, placeholder: '请输入内容' }" label="textarea" prop="textarea" type="textarea" />
      <q-item :props="{ maxlength: 4 }" label="password" prop="password" type="password" />
      <!-- <q-item label="number" prop="number" type="number" /> -->
    </el-form>

    <pre>{{ formData }}</pre>
  </div>
</template>
