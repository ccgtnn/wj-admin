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
  placeholder: {
    type: String,
    default: '',
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
    <input
      :id="id"
      :type="type"
      :value="props.modelValue"
      :class="props.css"
      :placeholder="placeholder"
      @input="updateInput"
    />
  </div>
</template>

<style scoped>
label {
  @apply font-bold block p-2;
}
input {
  @apply px-3 py-2 
  border-2 border-mainColors-form-input-brd bg-mainColors-form-input-bg bg-opacity-0
  rounded-md 
  focus:outline-none focus:border-mainColors-form-input-brdActive;
}
</style>
