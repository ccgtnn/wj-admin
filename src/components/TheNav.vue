<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// главное меню
const menuList = computed(() => [
  {
    name: 'Журналы',
    isActive: route.path.includes('issues'),
    to: '/p/journals/issues',
  },
])
</script>

<template>
  <nav>
    <ul class="menu-list">
      <li v-for="(menuItem, i) in menuList" :key="i" class="menu-list__item">
        <router-link
          :to="menuItem.to"
          class="menu-list__button"
          :class="{ 'menu-list__button_active': menuItem.isActive }"
        >
          {{ menuItem.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu-list {
  @apply flex gap-4 items-center flex-wrap;
}
.menu-list__item {
  @apply relative;
}
.menu-list__button {
  @apply px-4 py-1.5 
  flex space-x-2
  text-mainColors-header-nav-button-text backdrop-brightness-110
  text-lg rounded-full;
}
.menu-list__button_active {
  @apply bg-mainColors-header-nav-button-bgActive border-none;
}
</style>
