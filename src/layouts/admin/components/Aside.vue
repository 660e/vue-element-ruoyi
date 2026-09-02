<script setup>
import { PanelLeftClose, PanelLeftOpen, ChevronDown, Info } from '@lucide/vue';

import { useAppStore } from '@/stores';

const router = useRouter();
const appStore = useAppStore();

const expanded = ref(true);
const menus = ref(appStore.getMenus());

function to(menu) {
  if (menu.meta?.expanded !== undefined) {
    menu.meta.expanded = !menu.meta.expanded;
  } else {
    router.push({ name: menu.name });
  }
}
</script>

<template>
  <aside class="border-border bg-primary-light-9 border-r">
    <div :class="[expanded ? 'w-50' : 'w-10']" class="flex h-full flex-col duration-200">
      <div class="border-border flex h-10 shrink-0 items-center justify-end border-b px-3">
        <component
          :is="expanded ? PanelLeftClose : PanelLeftOpen"
          @click="expanded = !expanded"
          class="text-regular-foreground hover:text-brand hidden cursor-pointer duration-200"
          size="16"
        />
      </div>
      <div class="flex-1 overflow-auto">
        <el-scrollbar>
          <div v-for="(menu, index) in menus" class="border-border border-b" :key="index">
            <div @click="to(menu)" class="flex h-10 items-center gap-1.5 px-3">
              <Info class="shrink-0" size="16" />
              <div class="flex-1 leading-none">{{ menu.meta?.title }}</div>
              <ChevronDown v-if="menu.children?.length" :class="[menu.meta?.expanded ? 'rotate-180' : '']" class="shrink-0 duration-200" size="16" />
            </div>
            <div
              v-if="menu.children?.length"
              :style="{ gridTemplateRows: menu.children?.length && menu.meta?.expanded ? '1fr' : '0fr' }"
              class="grid duration-200"
            >
              <div class="bg-background overflow-hidden">
                <div v-for="(item, idx) in menu.children" :key="idx">
                  <div @click="to(item)" class="flex h-10 items-center gap-1.5 px-3">
                    <div class="w-4"></div>
                    <div class="flex-1 leading-none">{{ item.meta?.title }}</div>
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
