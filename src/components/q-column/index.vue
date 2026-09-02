<script setup>
defineOptions({ name: 'QColumn' });

const { dict } = defineProps({
  dict: { type: String, default: null },
});

const dictList = ref([]);

onMounted(async () => {
  if (dict) {
    dictList.value = [];
  }
});

function formatter(_, __, cellValue) {
  return cellValue;
}
</script>

<template>
  <el-table-column :formatter="formatter" />
</template>
