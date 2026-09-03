<script setup lang="jsx">
defineOptions({ name: 'QColumn' });

function formatter(_, __, cellValue) {
  return <span>{cellValue}</span>;
}
</script>

<template>
  <el-table-column :formatter="formatter" />
</template>
