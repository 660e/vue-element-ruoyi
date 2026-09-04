<script setup>
// import { required } from '@/utils';

const visible = ref(true);
const confirming = ref(false);
const formRef = ref(null);
const formData = ref({});

function confirm() {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log(formData.value);
    }
  });
}
</script>

<template>
  <q-dialog v-model="visible" v-model:confirming="confirming" @confirm="confirm" title="title" width="500">
    <el-form :model="formData" ref="formRef">
      <!--  -->
    </el-form>
  </q-dialog>
</template>
