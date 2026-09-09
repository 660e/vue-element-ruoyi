<script setup>
import { getDept } from '@/api/system/dept.js';

defineOptions({ name: 'QDeptTree', inheritAttrs: false });

onMounted(async () => {
  await getDept();
});
</script>

<template>
  <div class="flex w-60 flex-col py-3 pl-3">
    <div class="shrink-0">filter</div>
    <el-scrollbar>
      <div class="h-500 bg-red-50"></div>
    </el-scrollbar>
  </div>
</template>
