<script setup>
import { useTransition } from '@vueuse/core';

const statistics = reactive([
  { title: '煤矿总数', source: 0, output: 0 },
  { title: '正常生产煤矿', source: 0, output: 0 },
  { title: '正常生产达标煤矿', source: 0, output: 0 },
  { title: '一级达标煤矿', source: 0, output: 0 },
]);

statistics.forEach((item) => {
  item.output = useTransition(toRef(item, 'source'), { duration: 1000 });
});

onMounted(() => {
  updateStatisticSources([4157, 2118, 1910, 466]);
});

function updateStatisticSources(sources) {
  statistics.forEach((item, index) => {
    item.source = sources[index] ?? 0;
  });
}
</script>

<template>
  <div class="space-y-3 p-3">
    <div>
      <el-alert title="当前页面仅供功能演示和调试使用，不具备真实性及实时性，请勿作为实际业务依据" type="warning" :closable="false" />
    </div>
    <div class="grid grid-cols-4 gap-3">
      <div v-for="item in statistics" class="border-border rounded-base space-y-3 border p-3" :key="item.title">
        <div class="text-secondary-foreground text-sm leading-none">{{ item.title }}</div>
        <div class="font-mono text-2xl leading-none">{{ item.output.toFixed(0) }}</div>
      </div>
    </div>
  </div>
</template>
