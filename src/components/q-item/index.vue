<script setup>
import { Info } from '@lucide/vue';

defineOptions({ name: 'QItem' });
defineProps({
  hint: { type: String, default: null },
});
</script>

<template>
  <el-form-item class="q-item">
    <template #label="{ label }">
      <span>{{ label }}</span>
      <el-tooltip v-if="hint" placement="top" :content="hint">
        <Info size="14" />
      </el-tooltip>
    </template>

    <el-input />
  </el-form-item>
</template>
