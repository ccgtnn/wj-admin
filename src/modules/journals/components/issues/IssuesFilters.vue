<script setup>
import { inject } from 'vue'

const searchQuery = inject('issuesSearchQuery')
</script>

<template>
  <div class="filters">
    <!--filters-->

    <!--search-->
    <AppFilter :is-active="!!searchQuery">
      <IconClose
        v-if="searchQuery"
        class="filters__close-icon"
        @click="searchQuery = ''"
      />
      <FormInput id="text" v-model="searchQuery" placeholder="ПОИСК" />
    </AppFilter>
  </div>
</template>

<style scoped>
.filters {
  @apply flex gap-1;
}
.filters__close-icon {
  @apply w-6 cursor-pointer;
}
</style>
