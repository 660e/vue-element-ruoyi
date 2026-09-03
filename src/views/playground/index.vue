<script setup>
import { useDictStore } from '@/stores';

const dictStore = useDictStore();
</script>

<template>
  <div>
    <pre>{{ dictStore }}</pre>
  </div>
</template>
