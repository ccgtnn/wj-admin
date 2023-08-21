<script setup></script>

<template>
  <h2>
    <slot></slot>
  </h2>
</template>

<style scoped>
h2 {
  @apply px-4 py-3
  border-l-4 border-mainColors-h2-brd bg-mainColors-h2-bg 
  duration-300 font-bold text-lg
  hover:border-l-8;
}
</style>
