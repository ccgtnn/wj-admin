<script setup>
import { useIssuesStore } from '../../stores/issues.store'
import ModIssuesEditor from './ModIssuesEditor.vue'

const props = defineProps({
  issuesItem: {
    type: Object,
    required: true,
  },
})

const issuesStore = useIssuesStore()
</script>

<template>
  <AppCard :isActive="issuesItem.isFull" class="item">
    <div class="item__title">
      <div class="item__number">№ {{ issuesItem.number }}</div>
      <div class="item__year">{{ issuesItem.year }} г.</div>
      <div class="item__name">
        {{ issuesItem.name }}
      </div>
    </div>

    <div class="item__actions">
      <ModIssuesEditor type="edit" :issuesItem="issuesItem" />
      <AppOrderActions
        @move-left="issuesStore.changeOrder(issuesItem, -1)"
        @move-right="issuesStore.changeOrder(issuesItem, 1)"
        @move-to-start="issuesStore.moveToStart(issuesItem)"
        @move-to-end="issuesStore.moveToEnd(issuesItem)"
      />
    </div>
  </AppCard>
</template>

<style scoped>
.item {
  @apply py-2 flex justify-between gap-4 items-center;
}
.item__title {
  @apply flex gap-4 items-center;
}
.item__actions {
  @apply flex gap-4 items-center;
}
</style>
