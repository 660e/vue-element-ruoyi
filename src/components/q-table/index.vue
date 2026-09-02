<script setup>
defineOptions({ name: 'QTable', inheritAttrs: false });

const attrs = useAttrs();
const tableAttrs = computed(() => {
  const attrsWithoutStyles = { ...attrs };
  delete attrsWithoutStyles.class;
  delete attrsWithoutStyles.style;
  return attrsWithoutStyles;
});
</script>

<template>
  <div :class="attrs.class" :style="attrs.style" class="h-full">
    <el-table v-bind="tableAttrs" />
  </div>
</template>
