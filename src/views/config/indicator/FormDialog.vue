<script setup>
import { ElMessage } from 'element-plus';

import { createScoreTable, updateScoreTable } from '@/api/assessment/scoreTable.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});
const categoryOptions = ref([]);
const templateOptions = ref([]);

function open({ row, categoryTree = [], templateList = [] }) {
  formData.value = row ? { ...row } : {};
  categoryOptions.value = categoryTree;
  templateOptions.value = templateList;
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.scoreTableId ? updateScoreTable : createScoreTable;
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
    :title="formData.scoreTableId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="评分表名称" prop="tableName" :rules="[required]" />
      <q-item label="权重" prop="weight" :config="{ type: 'number' }" :rules="[required]" />
      <q-item label="煤矿类型" prop="mineType" :config="{ type: 'select', dict: 'mine_type' }" :rules="[required]" />
      <q-item label="排序" prop="sortOrder" :config="{ type: 'number' }" :rules="[required]" />
      <q-item
        label="所属模板"
        prop="templateId"
        :config="{ type: 'select', options: templateOptions, props: { label: 'templateName', value: 'templateId' } }"
        :rules="[required]"
      />
      <q-item
        label="专业大类"
        prop="categoryId"
        :config="{
          type: 'cascader',
          options: categoryOptions,
          props: { checkStrictly: true, emitPath: false, label: 'categoryName', value: 'categoryId' },
        }"
        :rules="[required]"
      />
    </el-form>
  </q-dialog>
</template>
