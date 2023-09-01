<script setup>
import { usePrepSections } from '../../composables/sections/usePrepSections'

// подготовка данных
usePrepSections()
</script>

<template>
  <div class="block">
    <div class="block__head">
      <div class="head__title">
        <h1>Издания</h1>
      </div>
    </div>

    <div class="block__body"></div>
  </div>
</template>

<style scoped>
.block__head {
  @apply flex gap-4 justify-between flex-wrap;
}
.head__title {
  @apply py-4 flex-grow flex items-center gap-4;
}
.block__body {
  @apply py-2;
}
</style>
