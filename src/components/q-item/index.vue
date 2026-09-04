<script setup>
import { Info } from '@lucide/vue';
import { useFormItem } from 'element-plus';

defineOptions({ name: 'QItem' });
defineProps({
  hint: { type: String },
  props: { type: Object },
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

    <!-- 数字输入框 -->
    <el-input-number
      v-if="props?.type === 'number'"
      v-model="model[$attrs.prop]"
      :placeholder="`请输入${$attrs.label}`"
      :style="{ width: '100%' }"
      align="left"
      controls-position="right"
      disabled-scientific
      v-bind="props"
    />

    <!-- 输入框、密码框、文本域 -->
    <el-input v-else v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" clearable show-word-limit v-bind="props" />
  </el-form-item>
</template>
