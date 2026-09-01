<script setup>
import { PanelLeftClose, PanelLeftOpen, ChevronDown } from '@lucide/vue';

import { useAppStore } from '@/stores';

const appStore = useAppStore();
const expanded = ref(true);
const menus = computed(() => appStore.getMenus());

console.log(menus.value);
</script>

<template>
  <aside class="border-border bg-primary-light-9 border-r">
    <div :class="[expanded ? 'w-50' : 'w-10']" class="flex h-full flex-col duration-200">
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
          <div v-for="(menu, index) in menus" class="border-border border-b" :key="index">
            <div class="flex h-10 items-center px-3">
              <div class="flex-1">{{ menu.meta?.title }}</div>
              <ChevronDown v-if="menu.children?.length" :class="[menu.meta?.expanded ? 'rotate-180' : '']" class="shrink-0 duration-200" size="16" />
            </div>
            <div v-if="menu.children?.length">
              <div class="bg-background">
                <div v-for="(item, idx) in menu.children" :key="idx">
                  <div class="flex h-10 items-center px-3">
                    <div class="flex-1">{{ item.meta?.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-10"></div>
        </el-scrollbar>
      </div>
    </div>
  </aside>
</template>
