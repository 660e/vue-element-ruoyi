<script setup>
defineOptions({ name: 'QDialog' });
</script>

<template>
  <el-dialog align-center destroy-on-close draggable :close-on-click-modal="false" :close-on-press-escape="false">
    <slot></slot>

    <template #footer>
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </template>
  </el-dialog>
</template>
