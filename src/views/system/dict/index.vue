<script setup>
import { getDictTypeList } from '@/api/system/dict.js';
</script>

<template>
  <q-table :request="getDictTypeList">
    <template #prepend>
      <div class="shrink-0">Prepend Content</div>
    </template>
    <template #append>
      <div class="shrink-0">Append Content</div>
    </template>
  </q-table>
</template>
