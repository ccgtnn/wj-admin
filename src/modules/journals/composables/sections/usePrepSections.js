import { computed, provide } from 'vue'
import { useSectionsStore } from '../../stores/sections.store'
import { useSectionsTransStore } from '../../stores/sectionsTrans.store'
import { useSearch } from '@/composables/app/search/useSearch'

export function usePrepSections(options = { issueId: 0 }) {
  const sectionsStore = useSectionsStore()
  const sectionsTransStore = useSectionsTransStore()

  // Инициализируем поиск - передаём строку, составленную из полей объекта section
  const search = useSearch((section) => `${section.name}`)

  const sectionsPrep = computed(() => {
    let data = sectionsStore.sectionsList

    if (options.issueId) {
      data = data.filter((e) => e.issueId == options.issueId)
    }

    // поиск
    if (search.isActive.value) data = data.filter((e) => search.check(e))

    data = data.map((e) => {
      // добавляем перевод на англ
      e.en = sectionsTransStore.getBySectionAndLang(e.id, 'en')

      return e
    })

    return data
  })

  const sectionsPrepCount = computed(() => sectionsPrep.value.length)

  provide('sectionsSearchQuery', search.searchQuery)
  provide('sectionsPrep', sectionsPrep)
  provide('sectionsPrepCount', sectionsPrepCount)

  return {
    search: search.searchQuery,
    sectionsPrep,
  }
}
