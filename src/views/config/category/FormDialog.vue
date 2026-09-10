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
const templateOptions = ref([]);

function open({ row, categoryTree = [], templateList = [], parentId }) {
  formData.value = row ? { ...row } : { parentId };
  categoryOptions.value = categoryTree;
  templateOptions.value = templateList;
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

function handleBonusChange(value) {
  if (value === '1') {
    formData.value.weight = 1;
  }
}

defineExpose({ open });
</script>

<template>
  <q-dialog
    v-model="visible"
    v-model:confirming="confirming"
    width="800"
    :title="formData.categoryId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form class="grid grid-cols-2 gap-x-6" label-position="top" :model="formData" ref="formRef">
      <q-item
        label="上级分类"
        prop="parentId"
        :config="{
          type: 'cascader',
          options: categoryOptions,
          props: { checkStrictly: true, emitPath: false, label: 'categoryName', value: 'categoryId' },
        }"
      />
      <q-item label="是否加分项" prop="bonus" :config="{ type: 'radio', dict: 'yes_no', onChange: handleBonusChange }" :rules="[required]" />
      <q-item label="分类名称" prop="categoryName" :rules="[required]" />
      <q-item v-if="!formData.parentId" label="分类编码" prop="categoryCode" />
      <q-item label="权重" prop="weight" :config="{ type: 'number', min: 0, max: 1, disabled: formData.bonus === '1' }" :rules="[required]" />
      <q-item
        label="标准分值"
        prop="standardScore"
        :config="{ type: 'number', min: 0, max: 100 }"
        :rules="[formData.bonus === '1' ? required : '']"
      />
      <q-item label="显示顺序" prop="sortOrder" :config="{ type: 'number' }" :rules="[required]" />
      <q-item
        label="所属模板"
        prop="templateId"
        :config="{ type: 'select', options: templateOptions, props: { label: 'templateName', value: 'templateId' } }"
        :rules="[required]"
      />
    </el-form>
  </q-dialog>
</template>
