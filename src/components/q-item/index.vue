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

const valueFormat = computed(() => {
  switch (itemConfig.type) {
    case 'date':
      return 'YYYY-MM-DD';
    case 'month':
      return 'YYYY-MM';
    case 'year':
      return 'YYYY';
    default:
      return '';
  }
});

onMounted(async () => {
  switch (itemConfig.type) {
    case 'select': {
      if (itemConfig.dict) {
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
      <el-tooltip v-if="hint" placement="top" :content="hint">
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
      align="left"
      class="w-full!"
      controls-position="right"
      :placeholder="`请输入${$attrs.label}`"
      disabled-scientific
      v-bind="itemConfig"
    />

    <!-- 日期选择器、月份选择器、年份选择器 -->
    <el-date-picker
      v-else-if="['date', 'month', 'year'].includes(itemConfig.type)"
      v-model="model[$attrs.prop]"
      class="w-full!"
      :placeholder="`请选择${$attrs.label}`"
      :value-format="valueFormat"
      v-bind="itemConfig"
    />

    <!-- 输入框、密码框、文本域 -->
    <el-input v-else v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" :rows="3" clearable show-word-limit v-bind="itemConfig" />
  </el-form-item>
</template>
