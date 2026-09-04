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

    <!-- 输入框 -->
    <el-input v-if="type === 'text'" v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" show-word-limit v-bind="props" />

    <!-- 文本域 -->
    <el-input
      v-else-if="type === 'textarea'"
      v-model="model[$attrs.prop]"
      :placeholder="`请输入${$attrs.label}`"
      type="textarea"
      show-word-limit
      v-bind="props"
    />

    <!-- 密码框 -->
    <el-input v-else-if="type === 'password'" v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" show-password v-bind="props" />

    <!-- 默认 -->
    <div v-else>{{ $attrs.prop }}</div>
  </el-form-item>
</template>
