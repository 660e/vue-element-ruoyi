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
      <el-tooltip v-if="hint" placement="top" :content="hint">
        <Info size="14" />
      </el-tooltip>
    </template>

    <!-- 输入框 -->
    <el-input v-if="type === 'text'" v-model="model[$attrs.prop]" show-word-limit :maxlength="props.maxlength" />

    <!-- 文本域 -->
    <el-input v-else-if="type === 'textarea'" v-model="model[$attrs.prop]" type="textarea" show-word-limit :maxlength="props.maxlength" />

    <!-- 密码框 -->
    <el-input v-else-if="type === 'password'" v-model="model[$attrs.prop]" show-password :maxlength="props.maxlength" />

    <!-- 默认 -->
    <div v-else>{{ type }}</div>
  </el-form-item>
</template>
