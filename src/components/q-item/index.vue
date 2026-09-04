<script setup>
import { Info } from '@lucide/vue';
import { useFormItem } from 'element-plus';

defineOptions({ name: 'QItem' });
defineProps({
  hint: { type: String, default: null },
  props: { type: Object, default: () => ({}) },
  type: { type: String, default: null },
});

const { form } = useFormItem();
const model = computed(() => form?.model);
</script>

<template>
  <el-form-item class="q-item">
    <template #label="{ label }">
      <span>{{ label }}</span>
      <el-tooltip v-if="hint" :content="hint" placement="top">
        <Info size="14" />
      </el-tooltip>
    </template>

    <div v-if="type === ''"></div>

    <!-- 输入框、密码框、文本域 -->
    <el-input v-else v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" :type="type" clearable show-word-limit v-bind="props" />
  </el-form-item>
</template>
