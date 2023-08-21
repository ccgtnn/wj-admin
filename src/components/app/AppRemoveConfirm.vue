<script setup>
import { ref } from 'vue'

const emit = defineEmits(['click'])

defineProps({
  btnName: {
    type: String,
    default: 'Удалить',
  },
})

const isDialogOpen = ref(false)

function remove() {
  isDialogOpen.value = false
  emit('click')
}
</script>

<template>
  <div class="confirm">
    <button v-if="!isDialogOpen" @click="isDialogOpen = true">
      {{ btnName }}
    </button>
    <div v-else class="confirm__dialog">
      <div class="confirm__text"><slot></slot></div>
      <div class="confirm__actions">
        <button @click="remove()">{{ btnName }}</button>
        <button @click="isDialogOpen = false">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply px-3 pb-2 pt-1.5
  text-mainColors-removeConfirm-text bg-mainColors-removeConfirm-btn-bg shadow-lg rounded-md 
  hover:shadow-none hover:bg-mainColors-removeConfirm-btn-bgHover;
}
.confirm__dialog {
  @apply p-4 rounded-md space-y-2 
  text-mainColors-removeConfirm-text bg-mainColors-removeConfirm-bg;
}
.confirm__actions {
  @apply flex gap-2 items-center justify-between w-full;
}
</style>
