<script setup>
import { ElMessage } from 'element-plus';

import { createUser, updateUser } from '@/api/system/user.js';
import { required, mobile, email } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

const roleOptions = ref([]);

function open({ row, roleIds = [], roles = [] }) {
  formData.value = row ? { ...row, roleIds } : { roleIds };
  roleOptions.value = roles;
  visible.value = true;
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.userId ? updateUser : createUser;
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
    :title="formData.userId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form class="grid grid-cols-2 gap-x-6" label-position="top" :model="formData" ref="formRef">
      <q-item label="用户昵称" prop="nickName" :rules="[required]" />
      <q-item label="归属部门" prop="deptId" :config="{ type: 'cascader', options: [] }" :rules="[required]" />
      <q-item label="手机号码" prop="phonenumber" :rules="[required, mobile]" />
      <q-item label="邮箱" prop="email" :rules="[email]" />
      <q-item label="状态" prop="status" :config="{ type: 'radio', dict: 'sys_normal_disable' }" :rules="[required]" />
      <q-item label="用户性别" prop="sex" :config="{ type: 'radio', dict: 'sys_user_sex' }" />
      <q-item
        class="col-span-2"
        label="角色"
        prop="roleIds"
        :config="{ type: 'select', options: roleOptions, multiple: true, props: { label: 'roleName', value: 'roleId' } }"
      />
      <q-item class="col-span-2" label="备注" prop="remark" :config="{ type: 'textarea' }" />
    </el-form>
  </q-dialog>
</template>
