<script setup>
defineOptions({ name: 'QItem' });
</script>

<template>
  <el-form-item class="q-item">
    <template #label="{ label }">
      <div>{{ label }}</div>
    </template>

    <el-input />
  </el-form-item>
</template>
