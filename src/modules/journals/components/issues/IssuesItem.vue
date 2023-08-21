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
    <div class="item__head">
      <div class="item__title">
        <div class="item__name">
          № {{ issuesItem.name }}
          <span class="name__day">{{ issuesItem.day }}</span>
        </div>
        <ModIssuesEditor type="edit" :issuesItem="issuesItem" />
      </div>
      <div class="item__more">
        <AppOrderActions
          @move-left="issuesStore.changeOrder(issuesItem, -1)"
          @move-right="issuesStore.changeOrder(issuesItem, 1)"
          @move-to-start="issuesStore.moveToStart(issuesItem)"
          @move-to-end="issuesStore.moveToEnd(issuesItem)"
        />
      </div>
    </div>
  </AppCard>
</template>

<style scoped>
.item__head {
  @apply py-2 flex justify-between gap-4 items-center;
}
.item__more {
  @apply flex gap-4 items-center;
}
.item__title {
  @apply text-xl flex gap-4 items-center;
}
</style>
