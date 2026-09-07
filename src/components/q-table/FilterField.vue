<script setup>
const emit = defineEmits(['search']);
const { parentSlots } = defineProps({ parentSlots: { type: Object } });

const items = computed(() => {
  return (parentSlots.default?.() || [])
    .filter((item) => {
      return item.type.name === 'QColumn' && item.props?.config?.filter;
    })
    .map((item) => {
      console.log(item.props);
      return item.props;
    });
});

function reset() {
  console.log('reset');
  emit('search');
}
</script>

<template>
  <div class="q-table-filter-field shrink-0">
    <el-form class="flex gap-3" @submit.prevent="$emit('search')">
      <div class="grid flex-1 grid-cols-4 gap-3">
        <el-form-item v-for="item in items" class="ring-border focus-within:ring-brand rounded-base m-0! ring-1 duration-200" :key="item.prop">
          <div class="flex w-full">
            <div class="max-w-1/2 shrink-0 pl-3 text-ellipsis">{{ item.label }}</div>

            <el-input class="flex-1" />
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
.q-table-filter-field :deep(.el-select) .el-input__wrapper {
  box-shadow: none;
}
</style>
