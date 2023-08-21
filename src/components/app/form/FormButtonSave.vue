<script setup></script>

<template>
  <IconOk class="form-save-button" @click.self="$emit('click')"></IconOk>
</template>

<style scoped>
.form-save-button {
  @apply w-10 fill-mainColors-form-button-save-bg
  cursor-pointer;
}
</style>
