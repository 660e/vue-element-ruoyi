<script setup>
import { ElMessage } from 'element-plus';

import { createRole, updateRole } from '@/api/system/role.js';
import { required } from '@/utils';

const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

const treeRef = ref(null);
const menuData = ref([]);
const checkStrictly = ref(false);
const checkedCount = ref(0);

async function open({ row, tree = [], checkedKeys = [] }) {
  formData.value = row ? { ...row } : {};
  menuData.value = tree;
  checkedCount.value = checkedKeys.length;
  visible.value = true;

  await nextTick();
  treeRef.value.setCheckedKeys(checkedKeys);
}

function confirm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      confirming.value = true;
      const request = formData.value.roleId ? updateRole : createRole;
      try {
        const { code, msg } = await request({ ...formData.value, menuIds: treeRef.value.getCheckedKeys() });
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
    :title="formData.roleId ? '修改' : '新增'"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <div class="flex gap-6">
      <el-form class="flex-1" label-position="top" :model="formData" ref="formRef">
        <q-item label="角色名称" prop="roleName" :rules="[required]" />
        <q-item label="权限字符" prop="roleKey" :rules="[required]" />
        <q-item label="角色顺序" prop="roleSort" :config="{ type: 'number' }" :rules="[required]" />
        <q-item label="状态" prop="status" :config="{ type: 'radio', dict: 'sys_normal_disable' }" :rules="[required]" />
        <q-item label="备注" prop="remark" :config="{ type: 'textarea' }" />
      </el-form>
      <div class="border-border rounded-base flex h-120 flex-1 flex-col border">
        <div class="border-border flex items-center justify-between border-b px-3">
          <span>已选：{{ checkedCount }}</span>
          <el-checkbox v-model="checkStrictly" label="精确选择" />
        </div>
        <div class="flex-1 overflow-auto">
          <el-scrollbar>
            <div class="py-1.5">
              <el-tree node-key="id" :check-strictly="checkStrictly" :data="menuData" ref="treeRef" show-checkbox />
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
