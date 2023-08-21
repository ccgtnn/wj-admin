<script setup>
import { computed } from 'vue'
import { useErrorsStore } from '../../stores/errors.store'

const errorsStore = useErrorsStore()

const errorsList = computed(() => errorsStore.errorsList)
</script>

<template>
  <div>{{ errorsList }}</div>
</template>

<style scoped></style>
