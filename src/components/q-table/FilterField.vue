<script setup>
defineEmits(['search']);
defineProps({});

// const slots = useSlots();

function reset() {
  console.log('reset');
}
</script>

<template>
  <div class="shrink-0">
    <el-form class="flex gap-3" @submit.prevent="$emit('search')">
      <div class="flex-1"></div>
      <div class="shrink-0">
        <el-button native-type="submit" type="primary">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
