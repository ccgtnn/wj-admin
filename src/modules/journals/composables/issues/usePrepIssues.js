import { computed, provide, watch } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'
import { useIssuesTransStore } from '../../stores/issuesTrans.store'
import { useSearch } from '@/composables/app/search/useSearch'
import { useFiltersIssues } from './useFiltersIssues'

export function usePrepIssues() {
  const issuesStore = useIssuesStore()
  const issuesTransStore = useIssuesTransStore()
  const filters = useFiltersIssues()

  // Инициализируем поиск - передаём строку, составленную из полей объекта issue
  const search = useSearch(
    (issue) =>
      `${issue.name} ${issue.year} ${issue.number} ${issue.en?.name ?? ''}`,
  )

  const issuesPrep = computed(() => {
    let data = issuesStore.issuesList

    // поиск
    if (search.isActive.value) data = data.filter((e) => search.check(e))

    data = data.map((e) => {
      // добавляем перевод на англ
      e.en = issuesTransStore.getByIssueAndLang(e.id, 'en')

      return e
    })

    return data
  })

  const yearsSorted = computed(() => {
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
    let sorted = Object.entries(grouped)
      .map(([year, issuesList]) => ({
        year,
        issuesList,
      }))
      .sort((a, b) => b.year - a.year)

    return sorted
  })

  const yearsPrep = computed(() => {
    let filtered = yearsSorted.value

    // фильтры
    if (filters.isActive.value)
      filtered = filtered.filter((e) => filters.check(e))

    return filtered
  })

  // получаем массив лет, по которым есть издания
  const yearsList = computed(() =>
    [].concat('ВСЕ', yearsSorted?.value.map((e) => e.year) ?? []),
  )

  const issuesPrepCount = computed(() => issuesPrep.value.length)
  const yearsPrepCount = computed(() => yearsPrep.value.length)

  provide('issuesSearchQuery', search.searchQuery)
  provide('issuesPrep', issuesPrep)
  provide('issuesPrepGroupedByYear', yearsPrep)
  provide('issuesPrepCount', issuesPrepCount)
  provide('yearsPrepCount', yearsPrepCount)
  provide('yearsList', yearsList)

  provide('issuesFiltersList', filters.filtersList)
  provide('issuesFiltersIsActive', filters.isActive)

  return {
    search: search.searchQuery,
    issuesPrep,
  }
}
