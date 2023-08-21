<script setup>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>

<template>
  <div class="wrap">
    <TheHeader />
    <main>
      <RouterView></RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.wrap {
  @apply h-screen flex flex-col items-center;
}
main {
  @apply w-full flex-grow;
}
</style>
