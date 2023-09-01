import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import {
  sectionsTransValidator,
  arraySectionsTransValidator,
} from '../validators'
import { useErrorsStore } from '@/stores/errors.store'

export const useSectionsTransStore = defineStore('sectionsTrans', () => {
  const sectionsTransList = ref([])
  const errorsStore = useErrorsStore()

  const api = Api({
    API_URL: 'journal/sectionsTranslation',
    validator: sectionsTransValidator,
    arrayValidator: arraySectionsTransValidator,
  })

  const getsBySection = (sectionId) =>
    sectionsTransList.value.filter(
      (sectionTrans) => sectionTrans.sectionId === sectionId,
    )

  const getBySectionAndLang = (sectionId, lang) =>
    sectionsTransList.value.find(
      (sectionTrans) =>
        sectionTrans.sectionId === sectionId && sectionTrans.lang === lang,
    )

  const load = async () => {
    try {
      sectionsTransList.value = await api.load()
    } catch (error) {
      console.log('error', error)
      errorsStore.addError({ message: error.message })
    }
  }

  load()

  const create = async (data) => {
    try {
      const newSectionTrans = await api.create(data)
      sectionsTransList.value.unshift(newSectionTrans)
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const update = async (data) => {
    try {
      const updatedSectionTrans = await api.update(data)
      sectionsTransList.value = sectionsTransList.value.map((sectionTrans) =>
        sectionTrans.id === updatedSectionTrans.id
          ? updatedSectionTrans
          : sectionTrans,
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const remove = async (sectionTransId) => {
    try {
      await api.remove(sectionTransId)
      sectionsTransList.value = sectionsTransList.value.filter(
        (sectionTrans) => sectionTrans.id !== sectionTransId,
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  return {
    sectionsTransList,
    getsBySection,
    getBySectionAndLang,
    load,
    create,
    update,
    remove,
  }
})
