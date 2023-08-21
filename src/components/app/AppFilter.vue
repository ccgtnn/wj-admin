<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="filter"
    :class="[
      { filter__passive: !props.isActive },
      { filter__active: props.isActive },
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.filter {
  @apply flex flex-wrap items-center gap-4 p-4 border-b-2 duration-300;
}
.filter__passive {
  @apply border-mainColors-filters-brdPassive bg-mainColors-filters-bgPassive;
}
.filter__active {
  @apply border-mainColors-filters-brdActive bg-mainColors-filters-bgActive;
}
</style>
