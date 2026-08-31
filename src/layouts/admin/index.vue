<script setup>
import Aside from './components/Aside.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Header from './components/Header.vue';
import Version from './components/Version.vue';
</script>

<template>
  <div class="bg-background text-foreground flex h-screen flex-col overflow-hidden">
    <Header class="bg-amber-50" />
    <div class="flex flex-1 overflow-auto">
      <Aside class="bg-blue-50" />
      <div class="flex flex-1 flex-col">
        <div class="bg-cyan-50">
          <Breadcrumb />
          <Version />
        </div>
        <div class="flex-1 overflow-y-auto bg-red-50">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
