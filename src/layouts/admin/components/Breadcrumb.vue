<script setup>
const route = useRoute();

console.log(route.matched);
</script>

<template>
  <div>{{ $route.matched.length }}</div>
</template>
