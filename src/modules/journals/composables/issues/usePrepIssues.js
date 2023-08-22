import { computed, provide } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'
import { useSearch } from '@/composables/app/search/useSearch'
import { useFiltersIssues } from './useFiltersIssues'

export function usePrepIssues(options = {}) {
  const issuesStore = useIssuesStore()
  const filters = useFiltersIssues()

  const search = useSearch(
    (issue) => `${issue.name} ${issue.year} ${issue.number}`
  )

  const issuesPrep = computed(() => {
    let data = issuesStore.issuesList

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
