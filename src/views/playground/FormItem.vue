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
      <q-item label="text" prop="text" type="text" :props="{ maxlength: 4 }" />
      <q-item label="textarea" prop="textarea" type="textarea" :props="{ maxlength: 4 }" />
      <q-item label="password" prop="password" type="password" :props="{ maxlength: 4 }" />
      <!-- <q-item label="number" prop="number" type="number" /> -->
    </el-form>

    <pre>{{ formData }}</pre>
  </div>
</template>
