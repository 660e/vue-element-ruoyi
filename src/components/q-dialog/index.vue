<script setup>
import { X } from '@lucide/vue';

defineEmits(['cancel', 'confirm']);
defineOptions({ name: 'QDialog' });
defineProps({
  cancelText: { type: String, default: '取消' },
  confirmText: { type: String, default: '确定' },
});

const confirming = defineModel('confirming', { type: Boolean, default: false });
</script>

<template>
  <el-dialog align-center destroy-on-close :close-icon="X" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="overflow-auto px-6" :class="[$attrs.fullscreen ?? 'max-h-[70vh]']">
      <slot></slot>
    </div>

    <template #footer>
      <el-button @click="$emit('cancel')">{{ cancelText }}</el-button>
      <el-button @click="$emit('confirm')" type="primary" :loading="confirming">{{ confirmText }}</el-button>
    </template>
  </el-dialog>
</template>
