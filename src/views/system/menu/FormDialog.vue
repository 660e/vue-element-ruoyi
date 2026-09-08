<script setup>
import { ElMessage } from 'element-plus';

import { createMenu, updateMenu } from '@/api/system/menu.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(true);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

function open(row) {
  formData.value = row ? { ...row } : {};
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.menuId ? updateMenu : createMenu;
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
    :title="formData.menuId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form class="grid grid-cols-2 gap-x-6" label-position="top" :model="formData" ref="formRef">
      <q-item label="上级菜单" prop="parentId" />
      <q-item label="菜单类型" prop="menuType" :config="{ type: 'radio', dict: 'sys_menu_type' }" :rules="[required]" />

      <q-item label="菜单名称" prop="menuName" :rules="[required]" />
      <q-item label="类型" prop="menuType" :rules="[required]" />
      <q-item label="排序" prop="orderNum" :config="{ type: 'number' }" :rules="[required]" />
      <q-item label="状态" prop="status" :config="{ type: 'select', dict: 'sys_normal_disable' }" :rules="[required]" />
      <q-item label="备注" prop="remark" :config="{ type: 'textarea' }" />
    </el-form>
  </q-dialog>
</template>
