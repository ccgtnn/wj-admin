<script setup>
import { inject } from 'vue'

const searchQuery = inject('issuesSearchQuery')

const yearsList = inject('yearsList')
const issuesFiltersList = inject('issuesFiltersList')
const issuesFiltersIsActive = inject('issuesFiltersIsActive')
</script>

<template>
  <div class="filters">
    <!--filters-->
    <AppFilter :is-active="issuesFiltersIsActive">
      <AppDropMenu
        :menu-list="yearsList"
        start-item="ВСЕ"
        :is-active="issuesFiltersList.year != 'ВСЕ'"
        @choose="
          (_item) => {
            issuesFiltersList.year = _item
          }
        "
      />
    </AppFilter>

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
