<script setup>
import { useIssuesStore } from '../../stores/issues.store'
import ModSections from '../sections/ModSections.vue'
import ModIssuesEditor from './ModIssuesEditor.vue'

defineProps({
  issuesItem: {
    type: Object,
    required: true,
  },
})
const issuesStore = useIssuesStore()
</script>

<template>
  <AppCard class="issue-item">
    <div class="issue-item__title">
      <div class="issue-item__number">№ {{ issuesItem.number }}</div>
      <div class="issue-item__year">{{ issuesItem.year }} г.</div>
      <div class="issue-item__name">
        <div class="name__ru">{{ issuesItem.name }}</div>
        <div class="name__en">en: {{ issuesItem.en?.name }}</div>
      </div>
      <div class="issue-item__edit">
        <ModIssuesEditor type="edit" :issues-item="issuesItem" />
      </div>
    </div>

    <div class="issue-item__actions">
      <ModSections :issue-id="issuesItem.id" />
    </div>

    <div class="item__order">
      <AppOrderActions
        @move-to-previous="issuesStore.changeOrder(issuesItem, -1)"
        @move-to-next="issuesStore.changeOrder(issuesItem, 1)"
        @move-to-start="issuesStore.moveToStart(issuesItem)"
        @move-to-end="issuesStore.moveToEnd(issuesItem)"
      />
    </div>
  </AppCard>
</template>

<style scoped>
.issue-item {
  @apply py-2 flex justify-between gap-4 items-center;
}
.issue-item__title {
  @apply flex gap-4 items-center;
}
.issue-item__actions {
  @apply flex gap-2 items-center;
}
</style>
