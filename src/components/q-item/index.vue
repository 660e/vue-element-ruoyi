<script setup>
import { Info } from '@lucide/vue';
import { useFormItem } from 'element-plus';

import { useDictStore } from '@/stores';

defineOptions({ name: 'QItem' });

const { config } = defineProps({
  config: { type: Object },
  hint: { type: String },
});

const { form } = useFormItem();
const model = reactive(form?.model);

const dictStore = useDictStore();
const itemConfig = reactive({ ...config });

onMounted(async () => {
  switch (itemConfig.type) {
    case 'select': {
      if (itemConfig.dict && !itemConfig.options) {
        itemConfig.options = await dictStore.getList(itemConfig.dict);
      }
      break;
    }
  }
});
</script>

<template>
  <el-form-item class="q-item">
    <template #label="{ label }">
      <span>{{ label }}</span>
      <el-tooltip v-if="hint" :content="hint" placement="top">
        <Info size="14" />
      </el-tooltip>
    </template>

    <!-- 选择器 -->
    <el-select
      v-if="itemConfig.type === 'select'"
      v-model="model[$attrs.prop]"
      :placeholder="`请选择${$attrs.label}`"
      clearable
      v-bind="itemConfig"
    />

    <!-- 数字输入框 -->
    <el-input-number
      v-else-if="itemConfig.type === 'number'"
      v-model="model[$attrs.prop]"
      :placeholder="`请输入${$attrs.label}`"
      align="left"
      class="w-full!"
      controls-position="right"
      disabled-scientific
      v-bind="itemConfig"
    />

    <!-- 日期选择器、月份选择器、年份选择器 -->
    <el-date-picker
      v-else-if="['date', 'month', 'year'].includes(itemConfig.type)"
      v-model="model[$attrs.prop]"
      :placeholder="`请选择${$attrs.label}`"
      class="w-full!"
      v-bind="itemConfig"
    />

    <!-- 输入框、密码框、文本域 -->
    <el-input v-else v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" clearable show-word-limit v-bind="itemConfig" />
  </el-form-item>
</template>
