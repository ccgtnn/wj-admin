<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['moveLeft', 'moveRight', 'moveToStart', 'moveToEnd'])
</script>

<template>
  <div class="order-actions">
    <!-- Кнопка для сдвига элемента в начало списка -->
    <AppButton
      custom-class="icon-class"
      class="text-sm"
      @click="emit('moveToStart')"
    >
      <IconArrowsLeft class="w-4" />
    </AppButton>

    <!-- Кнопка для сдвига элемента влево -->
    <AppButton
      custom-class="icon-class"
      class="text-sm"
      @click="emit('moveLeft')"
    >
      <IconArrowLeft class="w-3" />
    </AppButton>

    <!-- Кнопка для сдвига элемента вправо -->
    <AppButton
      custom-class="icon-class"
      class="text-sm"
      @click="emit('moveRight')"
    >
      <IconArrowRight class="w-3" />
    </AppButton>

    <!-- Кнопка для сдвига элемента в конец списка -->
    <AppButton
      custom-class="icon-class"
      class="text-sm"
      @click="emit('moveToEnd')"
    >
      <IconArrowsRight class="w-4" />
    </AppButton>
  </div>
</template>

<style scoped>
.order-actions {
  @apply flex gap-4 items-center;
}
</style>
