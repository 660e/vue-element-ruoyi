<script setup>
import { captchaImage } from '@/api';
import { globalConfig } from '@/config/global.js';

const router = useRouter();
const model = reactive({ username: '', password: '', code: '', uuid: '' });
const code = reactive({ src: '', status: '' });
const disabled = computed(() => !model.username || !model.password || !model.code);
const submitting = ref(false);

onMounted(() => {
  getCaptcha();
});

async function getCaptcha() {
  if (code.status === 'loading' || submitting.value) return;

  code.status = 'loading';
  try {
    const { img, uuid } = await captchaImage();
    model.uuid = uuid;
    code.src = `data:image/png;base64,${img}`;
    code.status = 'success';
  } catch {
    code.status = '';
  }
}

async function submit() {
  if (disabled.value) return;

  submitting.value = true;
  try {
    console.log(model);
    router.push('/');
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <el-card class="w-100">
      <div class="text-center text-xl leading-none">{{ globalConfig.app.name }}</div>
      <el-form @submit.prevent="submit" class="mt-6">
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
