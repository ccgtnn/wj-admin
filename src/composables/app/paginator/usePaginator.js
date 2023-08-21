import { ref } from 'vue'

/**
 * Настройка пагинатора
 * @param {*} maxItemsPerPage количество элементов на странице
 * @param {*} isScrollTop будет ли скрол на верх после переходы на страницы пагинации
 */
export function usePaginator(
  options = { maxItemsPerPage: 12, isScrollTop: false }
) {
  const currentPage = ref(0)
  const maxItemsPerPage = ref(options.maxItemsPerPage)
  const itemsOnPageCount = ref(0)
  const pagesCount = ref(0)

  /**
   * Меняем текущую страницу
   * @param {number} _page
   */
  function changePage(_page) {
    currentPage.value = _page
    if (options.isScrollTop) window.scrollTo(0, 0)
  }

  /**
   * Меняем количество данных, отображаемых на странице
   * @param {number} value
   */
  function changeMaxItemsPerPage(newMaxItemsPerPage) {
    maxItemsPerPage.value = newMaxItemsPerPage
  }

  return {
    currentPage,
    maxItemsPerPage,
    itemsOnPageCount,
    pagesCount,
    changePage,
    changeMaxItemsPerPage,
  }
}
