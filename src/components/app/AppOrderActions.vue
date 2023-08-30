<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits([
  'moveLeft',
  'moveRight',
  'moveToStart',
  'moveToEnd',
  'moveUp',
  'moveDown',
])
const props = defineProps({
  direction: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="order-actions">
    <div v-if="direction == 'vertical'" class="order-actions__vertical">
      <!-- Кнопка для сдвига элемента в начало списка -->
      <AppButton
        custom-class="icon-class"
        class="text-sm"
        @click="emit('moveToEnd')"
      >
        <IconArrowsDown class="w-4" />
      </AppButton>

      <!-- Кнопка для сдвига элемента вниз -->
      <AppButton
        custom-class="icon-class"
        class="text-sm"
        @click="emit('moveDown')"
      >
        <IconArrowDown class="w-4" />
      </AppButton>

      <!-- Кнопка для сдвига элемента вверх -->
      <AppButton
        custom-class="icon-class"
        class="text-sm"
        @click="emit('moveUp')"
      >
        <IconArrowUp class="w-4" />
      </AppButton>

      <!-- Кнопка для сдвига элемента в конец списка -->
      <AppButton
        custom-class="icon-class"
        class="text-sm"
        @click="emit('moveToStart')"
      >
        <IconArrowsUp class="w-4" />
      </AppButton>
    </div>

    <div v-if="direction == 'horizontal'" class="order-actions__horizontal">
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
  </div>
</template>

<style scoped>
/* .order-actions {
  @apply flex gap-2 items-center;
} */
.order-actions__vertical {
  @apply flex gap-2 items-center;
}

.order-actions__horizontal {
  @apply flex gap-2 items-center;
}
</style>
