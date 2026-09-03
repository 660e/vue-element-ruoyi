<script setup>
const visible = ref(true);
</script>

<template>
  <q-dialog v-model="visible" title="title" width="500">
    <div class="h-500 bg-red-50">body</div>
  </q-dialog>
</template>
