<script setup>
import TheNav from '../components/TheNav.vue'
</script>

<template>
  <header>
    <TheNav class="nav" />
  </header>
</template>

<style scoped>
header {
  @apply w-full bg-mainColors-header-bg;
}
.nav {
  @apply py-4 flex justify-center;
}
</style>
