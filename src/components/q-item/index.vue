<script setup>
import { Info } from '@lucide/vue';
import { useFormItem } from 'element-plus';

import { queryAreaList } from '@/api/system/area.js';
import { VALUE_FORMAT } from '@/config';
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
const options = ref([]);

onMounted(async () => {
  switch (itemConfig.type) {
    case 'select':
    case 'radio': {
      if (itemConfig.dict) {
        options.value = await dictStore.getList(itemConfig.dict);
      }
      break;
    }

    case 'area': {
      const { data } = await queryAreaList();
      options.value = data;
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
      v-bind="{ options, ...itemConfig }"
    />

    <!-- 单选框 -->
    <el-radio-group v-else-if="itemConfig.type === 'radio'" v-model="model[$attrs.prop]" v-bind="{ options, ...itemConfig, type: 'button' }" />

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
      :placeholder="`请选择${$attrs.label}`"
      :value-format="VALUE_FORMAT[itemConfig.type]"
      v-bind="itemConfig"
    />

    <!-- 级联选择器 -->
    <el-cascader
      v-else-if="itemConfig.type === 'cascader'"
      v-model="model[$attrs.prop]"
      class="w-full"
      :placeholder="`请选择${$attrs.label}`"
      clearable
      v-bind="itemConfig"
    />

    <!-- 区域 -->
    <el-cascader
      v-else-if="itemConfig.type === 'area'"
      v-model="model[$attrs.prop]"
      class="w-full"
      :options="options"
      :placeholder="`请选择${$attrs.label}`"
      :props="{ checkStrictly: true, emitPath: false, label: 'areaName', value: 'areaId' }"
      clearable
    />

    <!-- 输入框、密码框、文本域 -->
    <el-input v-else v-model="model[$attrs.prop]" :placeholder="`请输入${$attrs.label}`" :rows="3" clearable show-word-limit v-bind="itemConfig" />
  </el-form-item>
</template>
