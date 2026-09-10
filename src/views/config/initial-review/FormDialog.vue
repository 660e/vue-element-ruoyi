<script setup>
import { ElMessage } from 'element-plus';

import { createDept, updateDept } from '@/api/system/dept.js';
import { required, mobile, email } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});
const deptData = ref([]);

function open({ row, tree = [], parentId = 100 }) {
  formData.value = row ? { ...row } : { parentId };
  deptData.value = tree;
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.deptId ? updateDept : createDept;
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
    width="800"
    :title="formData.deptId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form class="grid grid-cols-2 gap-x-6" label-position="top" :model="formData" ref="formRef">
      <template v-if="formData.deptId !== 100">
        <q-item
          label="上级机构"
          prop="parentId"
          :config="{
            type: 'cascader',
            options: deptData,
            showAllLevels: false,
            props: { checkStrictly: true, emitPath: false, label: 'deptName', value: 'deptId' },
          }"
          :rules="[required]"
        />
        <q-item label="排序" prop="orderNum" :config="{ type: 'number' }" :rules="[required]" />
      </template>
      <q-item label="机构名称" prop="deptName" :rules="[required]" />
      <q-item label="归属区域" prop="areaId" :config="{ type: 'area' }" :rules="[required]" />
      <q-item
        label="管辖机构"
        prop="managerOffice"
        :config="{
          type: 'cascader',
          options: deptData,
          showAllLevels: false,
          props: { checkStrictly: true, emitPath: false, label: 'deptName', value: 'deptId' },
        }"
        :rules="[required]"
      />
      <q-item label="管辖区域" prop="managerArea" :config="{ type: 'area' }" :rules="[required]" />
      <q-item label="机构类型" prop="type" :config="{ type: 'select', dict: 'sys_office_type' }" :rules="[required]" />
      <q-item label="机构等级" prop="grade" :config="{ type: 'select', dict: 'sys_office_grade' }" :rules="[required]" />
      <q-item label="负责人" prop="leader" />
      <q-item label="联系电话" prop="phone" :rules="[mobile]" />
      <q-item label="邮箱" prop="email" :rules="[email]" />
      <q-item label="状态" prop="status" :config="{ type: 'radio', dict: 'sys_normal_disable' }" :rules="[required]" />
    </el-form>
  </q-dialog>
</template>
