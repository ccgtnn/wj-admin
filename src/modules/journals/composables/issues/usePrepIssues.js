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
      `${issue.name} ${issue.year} ${issue.number} ${issue.e?.name ?? ''}`
  )

  const issuesPrep = computed(() => {
    let data = issuesStore.issuesList

    data = data.map((e) => {
      // добавляем перевод на англ
      e.en = issuesTranslationStore.getByIssueAndLang(e.id, 'en')

      return e
    })

    // поиск
    if (search.isActive.value) data = data.filter((e) => search.check(e))

    // фильтры
    if (filters.isActive.value) data = data.filter((e) => filters.check(e))

    return data
  })

  const issuesPrepCount = computed(() => issuesPrep.value.length)

  provide('issuesSearchQuery', search.searchQuery)
  provide('issuesPrep', issuesPrep)
  provide('issuesPrepCount', issuesPrepCount)

  provide('issuesFiltersList', filters.filtersList)
  provide('issuesFiltersIsActive', filters.isActive)

  return {
    search: search.searchQuery,
    issuesPrep,
  }
}
