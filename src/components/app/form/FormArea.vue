<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [Number, String],
    default: '',
  },
  css: {
    type: String,
    default: 'text',
  },
  rows: {
    type: Number,
    default: 3,
  },
})

function updateInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="input">
    <label v-if="label" :for="id">
      {{ label }}
    </label>
    <textarea
      :id="id"
      :type="type"
      :value="props.modelValue"
      :class="props.css"
      :rows="rows"
      @input="updateInput"
    ></textarea>
  </div>
</template>

<style scoped>
.input {
  @apply space-y-2;
}
label {
  @apply font-bold block;
}
textarea {
  @apply px-3 py-2 
  border-2 border-mainColors-form-input-brd bg-mainColors-form-input-bg bg-opacity-0
  rounded-md 
  focus:outline-none focus:border-mainColors-form-input-brdActive;
}
</style>
