<script setup>
import { ElMessage } from 'element-plus';

import { createCategory, updateCategory } from '@/api/assessment/category.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});
const categoryOptions = ref([]);

function open({ row, categoryTree = [], parentId }) {
  formData.value = row ? { ...row } : { parentId };
  categoryOptions.value = categoryTree;
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.categoryId ? updateCategory : createCategory;
      try {
        const { code, msg } = await request({ ...formData.value });
        if (code === 200) {
          ElMessage.success(msg);
          emit('confirm');
          visible.value = false;
        }
      } finally {
        confirming.value = false;
      }
    }
  });
}

defineExpose({ open });
</script>

<template>
  <q-dialog
    v-model="visible"
    v-model:confirming="confirming"
    width="400"
    :title="formData.categoryId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item
        label="上级分类"
        prop="parentId"
        :config="{
          type: 'cascader',
          options: categoryOptions,
          props: { checkStrictly: true, emitPath: false, label: 'categoryName', value: 'categoryId' },
        }"
      />
      <q-item label="分类名称" prop="categoryName" :rules="[required]" />
      <q-item v-if="!formData.parentId" label="分类编码" prop="categoryCode" />
      <q-item label="显示顺序" prop="sortOrder" :config="{ type: 'number' }" :rules="[required]" />
    </el-form>
  </q-dialog>
</template>
