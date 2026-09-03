<script setup>
import { useDictStore } from '@/stores';

const dictStore = useDictStore();

onMounted(async () => {
  console.log(await dictStore.getList('sys_normal_disable'));
});
</script>

<template>
  <div></div>
</template>
