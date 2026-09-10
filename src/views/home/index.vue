<script setup>
import { useTransition } from '@vueuse/core';

const mineCountSource = ref(0);
const normalMineCountSource = ref(0);
const standardMineCountSource = ref(0);
const firstLevelMineCountSource = ref(0);

const mineCount = useTransition(mineCountSource, { duration: 1000 });
const normalMineCount = useTransition(normalMineCountSource, { duration: 1000 });
const standardMineCount = useTransition(standardMineCountSource, { duration: 1000 });
const firstLevelMineCount = useTransition(firstLevelMineCountSource, { duration: 1000 });

onMounted(() => {
  mineCountSource.value = 4157;
  normalMineCountSource.value = 2118;
  standardMineCountSource.value = 1910;
  firstLevelMineCountSource.value = 466;
});
</script>

<template>
  <div class="space-y-3 p-3">
    <div>
      <el-alert title="当前页面仅供功能演示和调试使用，不具备真实性及实时性，请勿作为实际业务依据" type="warning" :closable="false" />
    </div>
    <div class="grid grid-cols-4 gap-3">
      <el-statistic class="border-border rounded-base border px-3 py-2" title="煤矿总数" :value="mineCount" />
      <el-statistic class="border-border rounded-base border px-3 py-2" title="正常生产煤矿" :value="normalMineCount" />
      <el-statistic class="border-border rounded-base border px-3 py-2" title="正常生产达标煤矿" :value="standardMineCount" />
      <el-statistic class="border-border rounded-base border px-3 py-2" title="一级达标煤矿" :value="firstLevelMineCount" />
    </div>
  </div>
</template>
