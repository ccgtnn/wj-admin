<script setup>
import { usePrepIssues } from '../../composables/issues/usePrepIssues'
import IssuesList from './IssuesList.vue'
import ModIssuesEditor from './ModIssuesEditor.vue'
import IssuesFilters from './IssuesFilters.vue'

// подготовка данных
usePrepIssues()
</script>

<template>
  <div class="block">
    <div class="block__head">
      <div class="head__title">
        <h1>Издания</h1>
        <ModIssuesEditor />
      </div>

      <IssuesFilters />
    </div>

    <div class="block__body">
      <IssuesList />
    </div>
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
