import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** Обработчик ошибок */
export const useErrorsStore = defineStore('errors', () => {
  const errorsList = ref([])

  const addError = (error) => {
    errorsList.value.unshift(error)
  }

  const getErrors = computed(() => errorsList.value)

  return { addError, getErrors }
})
