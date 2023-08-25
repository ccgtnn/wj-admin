import { computed, provide } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'
import { useIssuesTranslationStore } from '../../stores/issuesTranslation.store'
import { useSearch } from '@/composables/app/search/useSearch'
import { useFiltersIssues } from './useFiltersIssues'

export function usePrepIssues(options = {}) {
  const issuesStore = useIssuesStore()
  const issuesTranslationStore = useIssuesTranslationStore()
  const filters = useFiltersIssues()

  const search = useSearch(
    (issue) => `${issue.name} ${issue.year} ${issue.number} ${issue.en.name}`
  )

  const issuesPrep = computed(() => {
    let data = issuesStore.issuesList

    data = data.map((e) => {
      // добавляем перевод на англ
      e.en = issuesTranslationStore.getByIssueAndLang(e.id, 'en') ?? {
        name: '',
      }

      // добавляем перевод на fr
      e.fr = issuesTranslationStore.getByIssueAndLang(e.id, 'fr') ?? {
        name: '',
      }

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
