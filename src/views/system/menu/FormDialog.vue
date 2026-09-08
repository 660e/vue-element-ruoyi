<script setup>
import { ElMessage } from 'element-plus';

import { createMenu, updateMenu } from '@/api/system/menu.js';
import { useDictStore } from '@/stores';
import { required } from '@/utils';

const dictStore = useDictStore();
const emit = defineEmits(['confirm']);
const visible = ref(false);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});
const menuData = ref([]);

const isCatalog = computed(() => formData.value.menuType === 'M');
const isMenu = computed(() => formData.value.menuType === 'C');
const isButton = computed(() => formData.value.menuType === 'F');
const formLabel = computed(() => dictStore.getLabel('sys_menu_type', formData.value.menuType));

function open(row, tree = [], parentId = 0) {
  formData.value = row ? { ...row } : { menuType: 'C', isFrame: '1', parentId };
  menuData.value = tree;
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
    :title="`${formData.menuId ? '修改' : '新增'}${formLabel}`"
    @cancel="visible = false"
    @confirm="confirm"
  >
    <el-form class="grid grid-cols-2 gap-x-6" label-position="top" :model="formData" ref="formRef">
      <q-item
        label="上级菜单"
        prop="parentId"
        :config="{ type: 'cascader', options: menuData, props: { checkStrictly: true, label: 'menuName', value: 'menuId' } }"
      />
      <q-item label="菜单类型" prop="menuType" :config="{ type: 'radio', dict: 'sys_menu_type' }" />
      <q-item prop="menuName" :label="`${formLabel}名称`" :rules="[required]" />
      <q-item label="排序" prop="orderNum" :config="{ type: 'number' }" :rules="[required]" />
      <template v-if="formData.menuType">
        <q-item v-if="!isButton" prop="path" :label="`${formData.isFrame === '0' ? '外链' : '路由'}地址`" :rules="[required]" />
        <q-item v-if="isMenu" label="路由参数" prop="query" />
        <q-item v-if="isMenu && formData.isFrame === '1'" label="组件路径" prop="component" :rules="[required]" />
        <q-item v-if="!isCatalog && formData.isFrame === '1'" label="权限字符" prop="perms" />
        <q-item v-if="!isButton" label="图标" prop="icon" />
        <q-item v-if="isMenu" label="是否外链" prop="isFrame" :config="{ type: 'radio', dict: 'yes_no' }" :rules="[required]" />
        <q-item v-if="!isButton" label="显示状态" prop="visible" :config="{ type: 'radio', dict: 'sys_show_hide' }" :rules="[required]" />
      </template>
      <q-item label="状态" prop="status" :config="{ type: 'radio', dict: 'sys_normal_disable' }" :rules="[required]" />
    </el-form>
  </q-dialog>
</template>
