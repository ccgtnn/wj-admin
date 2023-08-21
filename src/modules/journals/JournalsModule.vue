<script setup></script>

<template>
  <div class="journal-module">
    <div class="journal-module__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.journal-module__content {
  @apply container mx-auto;
}
</style>
