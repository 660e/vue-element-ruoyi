<script setup>
import { getDept } from '@/api/system/dept.js';
import { useRestAttrs } from '@/hooks';

defineOptions({ name: 'QDeptTree', inheritAttrs: false });

const attrs = useRestAttrs();
const treeRef = ref(null);
const treeData = ref([]);
const loading = ref(false);

onMounted(() => {
  getTreeData();
});

async function getTreeData() {
  loading.value = true;
  try {
    const { data } = await getDept();
    treeData.value = data;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div v-loading="loading" class="flex flex-col" :class="$attrs.class" :style="$attrs.style">
    <div class="shrink-0">filter</div>
    <el-scrollbar>
      <div class="h-500 bg-red-50" v-bind="attrs"></div>
    </el-scrollbar>
  </div>
</template>
