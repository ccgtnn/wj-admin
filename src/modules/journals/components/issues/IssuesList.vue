<script setup>
import { inject } from 'vue'
import IssuesItem from './IssuesItem.vue'

const props = defineProps({
  issuesList: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="issues-list">
    <div v-if="issuesList.length" class="issues-list__content _grid-one-column">
      <IssuesItem
        v-for="item in issuesList"
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
