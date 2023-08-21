<script setup>
import { computed } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: 'outline-class',
  },
})

const activeClass = computed(() => `${props.customClass}__active`)
</script>

<template>
  <div
    :class="[{ [activeClass]: props.isActive }, props.customClass]"
    class="card"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  @apply py-3 px-4 duration-300;
}

.outline-class {
  @apply border-2 border-mainColors-card-outline-brd rounded-xl;
}
.outline-class__active {
  @apply border-mainColors-card-outline-brdActive
  bg-mainColors-card-outline-bgActive;
}
</style>
