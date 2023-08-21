<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    default: 0,
  },
  full: {
    type: Number,
    default: 0,
  },
  progressClass: {
    type: String,
    default: 'default',
  },
})

const width = computed(() => (props.current / props.full) * 100)
</script>

<template>
  <div class="progress">
    <div
      class="progress__bar"
      :style="{ width: width + '%' }"
      :class="progressClass"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.progress {
  @apply p-1 w-full backdrop-brightness-90;
}
.progress__bar {
  @apply p-1 text-xs;
}
.default {
  @apply bg-mainColors-progress-def bg-opacity-10;
}
.gold {
  @apply bg-mainColors-progress-gold bg-opacity-10;
}
</style>
