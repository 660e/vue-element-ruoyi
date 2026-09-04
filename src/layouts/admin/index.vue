<script setup>
import Aside from './components/Aside.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Header from './components/Header.vue';
import Version from './components/Version.vue';
</script>

<template>
  <div class="bg-background text-foreground flex h-screen flex-col overflow-hidden">
    <Header />
    <div class="flex flex-1 overflow-auto">
      <Aside />
      <div class="flex flex-1 flex-col overflow-auto">
        <div class="border-border flex h-10 shrink-0 items-center justify-between border-b px-3">
          <Breadcrumb />
          <Version />
        </div>
        <div class="flex-1 overflow-auto">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
