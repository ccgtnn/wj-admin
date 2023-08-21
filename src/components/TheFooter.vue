<script setup>
import ErrorsList from '@/components/stat/ErrorsList.vue'
</script>

<template>
  <footer>
    <ErrorsList />
  </footer>
</template>

<style scoped>
footer {
  @apply w-full p-4 bg-mainColors-footer-bg text-mainColors-footer-text;
}
</style>
