<script setup></script>

<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<style scoped>
h1 {
  @apply px-4 pt-1 pb-1.5 
  bg-mainColors-h1-bg text-mainColors-h1-text text-lg
  rounded-full inline
  hover:shadow-none;
}
</style>
