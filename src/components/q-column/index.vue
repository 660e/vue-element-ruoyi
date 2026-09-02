<script setup lang="jsx">
import { useDict } from '@/hooks';

defineOptions({ name: 'QColumn' });

const { dict } = defineProps({
  dict: { type: String, default: null },
});

const { list: getDictList } = useDict();
const dictList = ref([]);

onMounted(async () => {
  if (dict) {
    dictList.value = await getDictList(dict);
  }
});

function formatter(_, __, cellValue) {
  return <span>{cellValue}</span>;
}
</script>

<template>
  <el-table-column :formatter="formatter" />
</template>
