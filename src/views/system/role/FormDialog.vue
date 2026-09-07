<script setup>
import { ElMessage } from 'element-plus';

import { createRole, updateRole } from '@/api/system/role.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
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
      const request = formData.value.roleId ? updateRole : createRole;
      const menuIds = []; // TODO
      try {
        const { code, msg } = await request({ ...formData.value, menuIds });
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
    width="500"
    :title="formData.roleId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form label-position="top" :model="formData" ref="formRef">
      <q-item label="角色名称" prop="roleName" :rules="[required]" />
      <q-item label="权限字符" prop="roleKey" :rules="[required]" />
      <q-item label="角色顺序" prop="roleSort" :config="{ type: 'number' }" :rules="[required]" />
      <q-item label="状态" prop="status" :config="{ type: 'select', dict: 'sys_normal_disable' }" :rules="[required]" />
      <q-item label="备注" prop="remark" :config="{ type: 'textarea' }" />
    </el-form>
  </q-dialog>
</template>
