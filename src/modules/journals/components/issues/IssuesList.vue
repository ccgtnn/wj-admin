<script setup>
import { inject } from 'vue'
import IssuesItem from './IssuesItem.vue'

const issuesPrepGroupedByYear = inject('issuesPrepGroupedByYear')
const issuesPrep = inject('issuesPrep')
const issuesPrepCount = inject('issuesPrepCount')
</script>

<template>
  {{ issuesPrepGroupedByYear }}
  <div class="list">
    <div class="list__count">Всего {{ issuesPrepCount }}</div>

    <div v-if="issuesPrepCount" class="list__content _grid-one-column">
      <IssuesItem
        v-for="item in issuesPrep"
        :key="item.id"
        :issues-item="item"
      />
    </div>

    <div v-else class="_sub-text">НЕТ ДАННЫХ</div>
  </div>
</template>

<style scoped>
.list__count {
  @apply py-2 text-sm opacity-50;
}
</style>
