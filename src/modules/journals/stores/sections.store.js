import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import { sectionsValidator, arraySectionsValidator } from '../validators'
import { useErrorsStore } from '@/stores/errors.store'
import {
  getMaxOrd,
  changeListOrder,
  moveItemToStart,
  moveItemToEnd,
} from '@/utiles'

export const useSectionsStore = defineStore('sections', () => {
  const sectionsList = ref([])
  const errorsStore = useErrorsStore()

  const api = Api({
    API_URL: 'journal/sections',
    validator: sectionsValidator,
    arrayValidator: arraySectionsValidator,
  })

  const sort = () => sectionsList.value.sort((a, b) => a.ord - b.ord)

  const getById = (id) =>
    sectionsList.value.find((section) => section.id === id)

  const getByIssue = (issueId) =>
    sectionsList.value.find((section) => section.issueId === issueId)

  const getNewOrd = (issueId) => {
    const sectionsByYear = getByIssue(issueId)
    return getMaxOrd(sectionsByYear) + 1
  }

  const load = async () => {
    try {
      sectionsList.value = await api.load()
      sort()
    } catch (error) {
      console.log('error', error)
      errorsStore.addError({ message: error.message })
    }
  }

  load()

  const create = async (sectionData) => {
    try {
      sectionData.ord = getNewOrd(+sectionData.year)
      const newSection = await api.create(sectionData)
      sectionsList.value.unshift(newSection)
      sort()
      return newSection
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const update = async (sectionData) => {
    try {
      const updatedSection = await api.update(sectionData)
      sectionsList.value = sectionsList.value.map((section) =>
        section.id === updatedSection.id ? updatedSection : section,
      )
      sort()
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const remove = async (sectionId) => {
    try {
      await api.remove(sectionId)
      sectionsList.value = sectionsList.value.filter(
        (section) => section.id !== sectionId,
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const handleOrderChange = async (operationFunction, section, to) => {
    try {
      const sectionsByIssue = getByIssue(section.issueId)
      const changedItems = operationFunction(sectionsByIssue, section.id, to)
      for (const item of changedItems) {
        await api.update(item)
      }
      sort()
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const changeOrder = (section, to) =>
    handleOrderChange(changeListOrder, section, to)
  const moveToStart = (section) => handleOrderChange(moveItemToStart, section)
  const moveToEnd = (section) => handleOrderChange(moveItemToEnd, section)

  return {
    sectionsList,
    getById,
    getByIssue,
    load,
    create,
    update,
    remove,
    changeOrder,
    moveToStart,
    moveToEnd,
  }
})
