<template>
  <div class="text-regular-foreground flex items-center gap-1.5 text-sm leading-none">
    <template v-for="(item, index) in $route.matched.slice(1, $route.matched.length)" :key="item.name">
      <div v-if="index" class="font-mono">/</div>
      <div>{{ item.meta?.title }}</div>
    </template>
  </div>
</template>
