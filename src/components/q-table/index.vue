<script setup>
import { useRestAttrs } from '@/hooks';

defineOptions({ name: 'QTable', inheritAttrs: false });

const attrs = useRestAttrs();
</script>

<template>
  <div :class="$attrs.class" :style="$attrs.style" class="h-full">
    <el-table v-bind="attrs" />
  </div>
</template>
