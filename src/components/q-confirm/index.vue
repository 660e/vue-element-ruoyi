<script setup>
import { ElMessage } from 'element-plus';

defineOptions({ name: 'QConfirm' });

const emit = defineEmits(['confirm']);
const { button, request } = defineProps({
  button: { type: Object },
  content: { type: String, default: '确定要删除该条数据吗？' },
  request: { type: Function },
  text: { type: String, default: '删除' },
});

const buttonProps = reactive({ link: true, type: 'danger', ...button });
const visible = ref(false);
const confirming = ref(false);

async function confirm() {
  if (request) {
    confirming.value = true;
    try {
      const { code, msg } = await request();
      if (code === 200) {
        ElMessage.success(msg);
        emit('confirm');
        visible.value = false;
      }
    } finally {
      confirming.value = false;
    }
  } else {
    visible.value = true;
  }
}
</script>

<template>
  <div class="flex">
    <el-button v-bind="buttonProps" @click="visible = true">{{ text }}</el-button>
    <q-dialog
      v-if="visible"
      v-model="visible"
      v-model:confirming="confirming"
      title="提示"
      width="400"
      :confirm-text="text"
      :confirm-type="buttonProps.type"
      @cancel="visible = false"
      @confirm="confirm"
      append-to-body
    >
      <div class="leading-none">{{ content }}</div>
    </q-dialog>
  </div>
</template>
