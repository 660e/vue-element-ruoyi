<script setup>
// import { captchaImage } from '@/api';
import { globalConfig } from '@/config/global.js';

const model = reactive({ username: '', password: '', code: '', uuid: '' });
const disabled = computed(() => !model.username || !model.password || !model.code);
const submitting = ref(false);
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <el-card class="w-100">
      <div class="text-center text-xl leading-none">{{ globalConfig.app.name }}</div>
      <el-form class="mt-6">
        <el-form-item>
          <el-input v-model="model.username" placeholder="请输入账号" size="large" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="model.password" placeholder="请输入密码" size="large" type="password" clearable show-password />
        </el-form-item>
        <el-form-item>
          <div class="w-full">
            <el-input v-model="model.code" placeholder="请输入验证码" size="large" />
          </div>
        </el-form-item>
        <el-button :disabled="disabled" :loading="submitting" class="w-full" native-type="submit" size="large" type="primary">
          {{ submitting ? '登录中...' : '登录' }}
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>
