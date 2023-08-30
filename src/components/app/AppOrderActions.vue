<script setup>
import { computed } from 'vue'

const emit = defineEmits([
  'moveToPrevious',
  'moveToNext',
  'moveToStart',
  'moveToEnd',
])

const props = defineProps({
  direction: {
    type: String,
    default: 'vertical',
  },
})

// Вычисляемые свойства для определения направления
const isVertical = computed(() => props.direction === 'vertical')
const isHorizontal = computed(() => props.direction === 'horizontal')

// Конфигурация кнопок в зависимости от направления
const verticalButtons = [
  { icon: 'IconArrowsDown', event: 'moveToEnd', iconSize: 'w-4' },
  { icon: 'IconArrowDown', event: 'moveToNext', iconSize: 'w-4' },
  { icon: 'IconArrowUp', event: 'moveToPrevious', iconSize: 'w-4' },
  { icon: 'IconArrowsUp', event: 'moveToStart', iconSize: 'w-4' },
]

const horizontalButtons = [
  { icon: 'IconArrowsLeft', event: 'moveToStart', iconSize: 'w-4' },
  { icon: 'IconArrowLeft', event: 'moveToPrevious', iconSize: 'w-2.5' },
  { icon: 'IconArrowRight', event: 'moveToNext', iconSize: 'w-2.5' },
  { icon: 'IconArrowsRight', event: 'moveToEnd', iconSize: 'w-4' },
]

// Выбор конфигурации кнопок в зависимости от направления
const buttons = computed(() => {
  if (isVertical.value) return verticalButtons
  if (isHorizontal.value) return horizontalButtons
  return []
})
</script>

<template>
  <div class="order-actions">
    <AppButton
      v-for="button in buttons"
      :key="button.event"
      custom-class="icon-class"
      class="text-sm"
      @click="emit(button.event)"
    >
      <component :is="button.icon" :class="button.iconSize" />
    </AppButton>
  </div>
</template>

<style scoped>
.order-actions {
  @apply flex gap-2 items-center;
}
</style>
