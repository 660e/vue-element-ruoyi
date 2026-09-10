<script setup>
import { Power } from '@lucide/vue';

import { logout } from '@/api';
import headerImage from '@/assets/images/layout/header.png';
import { globalConfig } from '@/config';
import { removeLocalStorage } from '@/utils';

const router = useRouter();

async function signOut() {
  try {
    await logout();
  } finally {
    removeLocalStorage('token');
    router.push('/login');
  }
}
</script>

<template>
  <header class="flex h-14 shrink-0 items-center justify-between bg-cover bg-center px-3" :style="{ backgroundImage: `url(${headerImage})` }">
    <div class="text-2xl leading-none text-white">{{ globalConfig.app.name }}</div>
    <div>
      <el-button type="danger" :icon="Power" @click="signOut" circle plain />
    </div>
  </header>
</template>
