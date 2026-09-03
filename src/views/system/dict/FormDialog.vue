<script setup>
const visible = ref(true);
</script>

<template>
  <q-dialog v-model="visible" title="title" width="500">
    <div>body</div>
  </q-dialog>
</template>
