<script setup>
import { PanelLeftClose, PanelLeftOpen } from '@lucide/vue';

import { useAppStore } from '@/stores';

const appStore = useAppStore();
const expanded = ref(true);

console.log(appStore.routes);
</script>

<template>
  <aside class="border-border bg-primary-light-9 border-r">
    <div :class="[expanded ? 'w-60' : 'w-10']" class="flex h-full flex-col duration-200">
      <div class="border-border flex h-10 shrink-0 items-center justify-end border-b px-3">
        <component
          :is="expanded ? PanelLeftClose : PanelLeftOpen"
          @click="expanded = !expanded"
          class="text-regular-foreground hover:text-brand cursor-pointer duration-200"
          size="16"
        />
      </div>
      <div class="flex-1 overflow-auto">
        <el-scrollbar>
          <div class="h-500"></div>
        </el-scrollbar>
      </div>
    </div>
  </aside>
</template>
