<script setup>
import { VALUE_FORMAT } from '@/config';
import { useDictStore } from '@/stores';

const emit = defineEmits(['search']);
const queryParams = defineModel({ type: Object });
const { parentSlots } = defineProps({ parentSlots: { type: Object } });

const items = computed(() => {
  return (parentSlots.default?.() || []).filter((item) => item.props?.config?.filter).map((item) => item.props);
});

const dictStore = useDictStore();
const dictListMap = reactive({});

onMounted(() => {
  items.value.forEach(async (item) => {
    if (item.config.dict && !dictListMap[item.config.dict]) {
      dictListMap[item.config.dict] = await dictStore.getList(item.config.dict);
    }
  });
});

function reset() {
  Object.keys(queryParams.value).forEach((key) => {
    queryParams.value[key] = undefined;
  });
  emit('search');
}
</script>

<template>
  <div v-if="items.length" class="q-table-filter-field shrink-0">
    <el-form class="flex gap-3" @submit.prevent="$emit('search')">
      <div class="grid flex-1 grid-cols-3 gap-3 min-[90rem]:grid-cols-4 min-[110rem]:grid-cols-5">
        <el-form-item v-for="item in items" class="ring-border focus-within:ring-brand rounded-base m-0! ring-1 duration-200" :key="item.prop">
          <div class="flex w-full">
            <div class="text-regular-foreground max-w-1/2 shrink-0 pl-3 text-ellipsis">{{ item.label }}</div>

            <el-input
              v-if="item.config.filter === 'text'"
              v-model="queryParams[item.config.props?.alias || item.prop]"
              :placeholder="`请输入${item.label}`"
              clearable
              v-bind="item.config.props"
            />

            <el-select
              v-else-if="item.config.filter === 'select'"
              v-model="queryParams[item.config.props?.alias || item.prop]"
              :options="dictListMap[item.config.dict]"
              :placeholder="`请选择${item.label}`"
              clearable
              v-bind="item.config.props"
            />

            <el-date-picker
              v-else-if="['date', 'month', 'year'].includes(item.config.filter)"
              v-model="queryParams[item.config.props?.alias || item.prop]"
              class="flex-1"
              :placeholder="`请选择${item.label}`"
              :type="item.config.filter"
              :value-format="VALUE_FORMAT[item.config.filter]"
              v-bind="item.config.props"
            />
          </div>
        </el-form-item>
      </div>
      <div class="shrink-0">
        <el-button native-type="submit" type="primary">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.q-table-filter-field :deep(.el-input) .el-input__wrapper,
.q-table-filter-field :deep(.el-select) .el-select__wrapper,
.q-table-filter-field :deep(.el-date-editor),
.q-table-filter-field :deep(.el-date-editor):hover {
  box-shadow: none;
}
</style>
