<script setup>
import { inject } from 'vue'
import IssuesList from './IssuesList.vue'

const issuesPrepGroupedByYear = inject('issuesPrepGroupedByYear')
const yearsPrepCount = inject('yearsPrepCount')
</script>

<template>
  <div class="years-list">
    <div v-if="yearsPrepCount" class="yers-list__content _grid-one-column">
      <AppCard class="year" v-for="year in issuesPrepGroupedByYear">
        <div class="years-list__title">{{ year.year }} год</div>
        <IssuesList
          :issuesList="year.issuesList"
          :count="year.issuesList.length"
        ></IssuesList>
      </AppCard>
    </div>

    <div v-else class="_sub-text">НЕТ ДАННЫХ</div>
  </div>
</template>

<style scoped>
.list__count {
  @apply py-2 text-sm opacity-50;
}
.years-list__title {
  @apply p-2 font-bold;
}
</style>
