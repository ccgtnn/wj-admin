<script setup>
import { computed } from 'vue'

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})

// получаем список ошибок на русском
const errorList = computed(() => {
  const errorList = []
  props.errors.forEach((e) => {
    if (e.$validator == 'required') errorList.push('Необходимо заполнить')
  })
  return errorList
})
</script>

<template>
  <div v-if="errorList.length" class="error">
    <div v-for="(error, i) in errorList" :key="i" class="error__item">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.error {
  @apply text-mainColors-form-warning;
}
.error__item {
  @apply p-2;
}
</style>
