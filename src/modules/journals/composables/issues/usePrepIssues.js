import { computed, provide } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'
import { useIssuesTranslationStore } from '../../stores/issuesTranslation.store'
import { useSearch } from '@/composables/app/search/useSearch'
import { useFiltersIssues } from './useFiltersIssues'

export function usePrepIssues(options = {}) {
  const issuesStore = useIssuesStore()
  const issuesTranslationStore = useIssuesTranslationStore()
  const filters = useFiltersIssues()

  // Инициализируем поиск - передаём строку, составленную из полей объекта issue
  const search = useSearch(
    (issue) =>
      `${issue.name} ${issue.year} ${issue.number} ${issue.en?.name ?? ''}`
  )

  const issuesPrep = computed(() => {
    let data = issuesStore.issuesList

    // поиск
    if (search.isActive.value) data = data.filter((e) => search.check(e))

    // фильтры
    if (filters.isActive.value) data = data.filter((e) => filters.check(e))

    data = data.map((e) => {
      // добавляем перевод на англ
      e.en = issuesTranslationStore.getByIssueAndLang(e.id, 'en')

      return e
    })

    return data
  })

  const issuesPrepGroupedByYear = computed(() => {
    // сначала сгруппировать выпуски по годам в объект
    const grouped = issuesPrep.value.reduce((groups, issue) => {
      const year = issue.year
      if (!groups[year]) {
        groups[year] = []
      }
      groups[year].push({ ...issue })
      return groups
    }, {})

    // затем преобразовать объект в массив и отсортировать его по годам
    const sorted = Object.entries(grouped)
      .map(([year, issuesList]) => ({
        year,
        issuesList,
      }))
      .sort((a, b) => b.year - a.year)

    return sorted
  })

  const issuesPrepCount = computed(() => issuesPrep.value.length)
  const yearsPrepCount = computed(() => issuesPrepGroupedByYear.value.length)

  provide('issuesSearchQuery', search.searchQuery)
  provide('issuesPrep', issuesPrep)
  provide('issuesPrepGroupedByYear', issuesPrepGroupedByYear)
  provide('issuesPrepCount', issuesPrepCount)
  provide('yearsPrepCount', yearsPrepCount)

  provide('issuesFiltersList', filters.filtersList)
  provide('issuesFiltersIsActive', filters.isActive)

  return {
    search: search.searchQuery,
    issuesPrep,
  }
}
