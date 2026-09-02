<script setup lang="jsx">
import { useDict } from '@/hooks';

defineOptions({ name: 'QColumn' });

const { dict } = defineProps({
  dict: { type: String, default: null },
});

const { list: getDictList, label: getDictLabel } = useDict();
const dictList = ref([]);

onMounted(async () => {
  if (dict) {
    dictList.value = await getDictList(dict);

    const label = await getDictLabel(dict, '0');
    console.log(label);
  }
});

function formatter(_, __, cellValue) {
  if (dict) {
    return <span>{cellValue}</span>;
  } else {
    return cellValue;
  }
}
</script>

<template>
  <el-table-column :formatter="formatter" />
</template>
