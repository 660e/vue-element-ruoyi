<script setup>
import Aside from './components/Aside.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Header from './components/Header.vue';
import Version from './components/Version.vue';
</script>

<template>
  <div>
    <Header />
    <Aside />
    <Version />
    <Breadcrumb />
    <RouterView />
  </div>
</template>
