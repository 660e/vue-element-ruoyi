<script setup>
import { X } from '@lucide/vue';

defineEmits(['cancel', 'confirm']);
defineOptions({ name: 'QDialog' });
defineProps({
  cancelText: { type: String, default: '取消' },
  cancelType: { type: String },
  confirmText: { type: String, default: '确定' },
  confirmType: { type: String, default: 'primary' },
});

const confirming = defineModel('confirming', { type: Boolean, default: false });
</script>

<template>
  <el-dialog :close-icon="X" :close-on-click-modal="false" :close-on-press-escape="false" align-center destroy-on-close>
    <el-scrollbar :max-height="$attrs.fullscreen ?? '70vh'">
      <div class="px-6">
        <slot></slot>
      </div>
    </el-scrollbar>

    <template #footer>
      <el-button :type="cancelType" @click="$emit('cancel')">{{ cancelText }}</el-button>
      <el-button :loading="confirming" :type="confirmType" @click="$emit('confirm')">{{ confirmText }}</el-button>
    </template>
  </el-dialog>
</template>
