<script setup>
import { reactive } from 'vue'
import { usePrepSections } from '../../composables/sections/usePrepSections'

const props = defineProps({
  issueId: {
    type: Number,
    default: 0,
  },
})

usePrepSections({ issueId: props.issueId })

// управление модальным окном
const modal = reactive({
  isOpen: false,
  size: 'md',
})

// открываем модальное окно
function open() {
  modal.isOpen = true
}
</script>

<template>
  <div class="sections">
    <AppButton @click="open">СОДЕРЖАНИЕ</AppButton>

    <AppModal
      :is-open="modal.isOpen"
      :size="modal.size"
      @close="modal.isOpen = false"
    >
      <template #head> СОДЕРЖАНИЕ </template>

      <template #body> </template>

      <template #actions></template>
    </AppModal>
  </div>
</template>

<style scoped></style>
