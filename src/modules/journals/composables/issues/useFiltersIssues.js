import { computed, reactive } from 'vue'

// Фильтры для записей
export function useFiltersIssues() {
  const filtersList = reactive({})

  // Активен ли хотябы один фильтр?
  const isActive = computed(() => false)

  /**
   * Проверяем запись на соответствие фильтрам
   * @param {object} item запись
   * @returns true/false
   */
  function check(item) {
    let check = true

    return check
  }

  return {
    check,
    isActive,
    filtersList,
  }
}
