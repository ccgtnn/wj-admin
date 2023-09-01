import { computed, reactive } from 'vue'

// Фильтры для записей
export function useFiltersIssues() {
  const filtersList = reactive({
    year: 'ВСЕ',
  })

  // Активен ли хотябы один фильтр?
  const isActive = computed(() => filtersList.year !== 'ВСЕ')

  /**
   * Проверяем запись на соответствие фильтрам
   * @param {object} item запись
   * @returns true/false
   */
  function check(item) {
    let isCheck = true

    if (item.year != filtersList.year) isCheck = false

    return isCheck
  }

  return {
    check,
    isActive,
    filtersList,
  }
}
