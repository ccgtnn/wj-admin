<script setup>
import { computed } from 'vue'

defineEmits(['close'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'xs',
  },
})

const sizes = {
  sm: 'xl:w-1/4 md:w-1/3 sm:w-1/2 w-full',
  md: 'xl:w-1/2 md:w-2/3 sm:w-4/5 w-full',
  lg: 'xl:w-2/3 md:w-5/6 w-full',
  xl: 'xl:w-5/6 sm:w-full',
  full: 'xl:w-11/12 sm:w-full',
}

const modalSize = computed(() => sizes[props.size] || '')
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-wrapper">
      <div :class="[modalSize]" class="modal">
        <div v-if="$slots.head" class="modal__head">
          <slot name="head"></slot>
          <IconClose class="modal__close-icon" @click="$emit('close')" />
        </div>

        <div v-if="$slots.body" class="modal__body">
          <slot name="body"></slot>
        </div>

        <div v-if="$slots.actions" class="modal__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-wrapper {
  @apply fixed top-0 left-0 z-20 w-full h-screen 
  flex items-start justify-center overflow-y-auto 
  bg-opacity-50 backdrop-blur bg-mainColors-modal-wrap;
}
.modal {
  @apply relative mx-5 mt-10 mb-10 
   backdrop-blur;
}
.modal__head {
  @apply p-4
  flex items-center justify-between gap-4
  text-xl text-mainColors-modal-head-text bg-mainColors-modal-head-bg
  rounded-t-2xl;
}
.modal__body {
  @apply p-4 
  bg-mainColors-modal-body-bg border-x-8 border-mainColors-modal-body-brd;
}
.modal__actions {
  @apply p-4
  text-mainColors-modal-actions-text bg-mainColors-modal-actions-bg
  rounded-b-2xl;
}
.modal__errors {
  @apply px-6 py-4;
}
.modal__close-icon {
  @apply w-6 fill-mainColors-modal-head-text cursor-pointer;
}
</style>
