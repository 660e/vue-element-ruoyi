<script setup>
import { RefreshCw } from '@lucide/vue';

import { getDept } from '@/api/system/dept.js';
import { useRestAttrs } from '@/hooks';

defineOptions({ name: 'QDeptTree', inheritAttrs: false });
defineProps({ background: { type: Boolean, default: true } });

const attrs = useRestAttrs();
const loading = ref(false);
const treeData = ref([]);
const filterText = ref('');

onMounted(() => {
  fetchTreeData();
});

async function fetchTreeData() {
  loading.value = true;
  try {
    const { data } = await getDept();
    treeData.value = data;
  } finally {
    loading.value = false;
  }
}

defineExpose({
  refresh: fetchTreeData,
});
</script>

<template>
  <div v-loading="loading" class="flex flex-col" :class="$attrs.class" :style="$attrs.style">
    <div class="flex shrink-0 gap-3 pb-3">
      <el-input v-model="filterText" placeholder="请输入机构名称" />
      <el-button :icon="RefreshCw" @click="fetchTreeData" />
    </div>
    <el-scrollbar class="rounded-base" :class="[background ? 'bg-neutral-50' : '']">
      <el-tree
        class="bg-transparent! py-1.5"
        node-key="deptId"
        :data="treeData"
        :default-expanded-keys="[100]"
        :expand-on-click-node="false"
        :props="{ label: 'deptName' }"
        highlight-current
        v-bind="attrs"
      />
    </el-scrollbar>
  </div>
</template>
