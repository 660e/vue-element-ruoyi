<script setup>
import { PanelLeftClose, PanelLeftOpen, ChevronDown, Info } from '@lucide/vue';

import { useAppStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const expanded = ref(true);
const menus = ref(appStore.getMenus());

function expandActiveMenu(items) {
  for (const item of items) {
    if (item.children?.length) {
      const containsActiveRoute = expandActiveMenu(item.children);
      item.meta ??= {};
      item.meta.expanded = containsActiveRoute;
      if (containsActiveRoute) {
        return true;
      }
    }
    if (item.name === route.name) {
      return true;
    }
  }
  return false;
}

onMounted(() => {
  expandActiveMenu(menus.value);
});

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
    <div class="flex h-full flex-col duration-200" :class="[expanded ? 'w-50' : 'w-10']">
      <div class="border-border flex h-10 shrink-0 items-center justify-end border-b px-3">
        <component
          :is="expanded ? PanelLeftClose : PanelLeftOpen"
          class="text-regular-foreground hover:text-brand hidden cursor-pointer duration-200"
          size="16"
          @click="expanded = !expanded"
        />
      </div>
      <div class="flex-1 overflow-auto">
        <el-scrollbar>
          <div v-for="(menu, index) in menus" class="border-border border-b" :key="index">
            <div class="flex h-10 cursor-pointer items-center gap-1.5 px-3 duration-200 hover:bg-blue-100" @click="to(menu)">
              <Info class="shrink-0" size="16" />
              <div class="flex-1 leading-none">{{ menu.meta?.title }}</div>
              <ChevronDown v-if="menu.children?.length" class="shrink-0 duration-200" size="16" :class="[menu.meta?.expanded ? 'rotate-180' : '']" />
            </div>
            <div
              v-if="menu.children?.length"
              class="grid duration-200"
              :style="{ gridTemplateRows: menu.children?.length && menu.meta?.expanded ? '1fr' : '0fr' }"
            >
              <div class="bg-background overflow-hidden">
                <div v-for="(item, idx) in menu.children" :key="idx">
                  <div
                    class="relative flex h-10 cursor-pointer items-center gap-1.5 px-3 duration-200 hover:bg-neutral-100"
                    :class="[item.name === $route.name ? 'text-brand' : '']"
                    @click="to(item)"
                  >
                    <div v-if="item.name === $route.name" class="border-brand absolute inset-0 border-t border-r-4 border-b"></div>
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
