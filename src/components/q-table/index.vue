<script setup>
import { useRestAttrs } from '@/hooks';

import FilterField from './FilterField.vue';

defineOptions({ name: 'QTable', inheritAttrs: false });

const attrs = useRestAttrs();
</script>

<template>
  <div :class="$attrs.class" :style="$attrs.style" class="q-table flex h-full">
    <slot name="prepend"></slot>

    <div class="flex flex-1 flex-col">
      <FilterField />
      <el-table v-bind="attrs" height="100%" border />
      <div class="shrink-0">Pagination</div>
    </div>

    <slot name="append"></slot>
  </div>
</template>
