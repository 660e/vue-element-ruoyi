<script setup>
import headerImage from '@/assets/images/layout/header.png';
import { globalConfig } from '@/config/global.js';
</script>

<template>
  <header :style="{ backgroundImage: `url(${headerImage})` }" class="flex h-14 shrink-0 items-center justify-between bg-cover bg-center px-3">
    <div class="text-2xl leading-none text-white">{{ globalConfig.app.name }}</div>
    <div>
      <div class="h-8 w-8 rounded-full bg-white"></div>
    </div>
  </header>
</template>
