<script setup>
import { ElMessage } from 'element-plus';

defineOptions({ name: 'QConfirm' });

const defaultButtonProps = {
  link: true,
  type: 'danger',
};

const emit = defineEmits(['confirm']);
const { button } = defineProps({
  button: { type: Object },
});

const buttonProps = reactive({ ...defaultButtonProps, ...button });
</script>

<template>
  <div class="flex">
    <el-button v-bind="buttonProps">删除</el-button>
  </div>
</template>
