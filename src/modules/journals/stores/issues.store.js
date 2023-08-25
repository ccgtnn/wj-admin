import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import { issuesValidator, arrayIssuesValidator } from '../validators'
import { useErrorsStore } from '@/stores/errors.store'
import {
  getMaxOrd,
  changeListOrder,
  moveItemToStart,
  moveItemToEnd,
} from '@/utiles'

export const useIssuesStore = defineStore('issues', () => {
  const issuesList = ref([])
  const errorsStore = useErrorsStore()

  const api = Api({
    API_URL: 'journal/issues',
    validator: issuesValidator,
    arrayValidator: arrayIssuesValidator,
  })

  const sort = () => issuesList.value.sort((a, b) => a.ord - b.ord)

  const getById = (id) => issuesList.value.find((issue) => issue.id === id)

  const getByYear = (year) =>
    issuesList.value.filter((issue) => issue.year === year)

  const getNewOrd = (year) => {
    const issuesByYear = getByYear(year)
    return getMaxOrd(issuesByYear) + 1
  }

  const getNewNumber = (year) => {
    const issuesByYear = getByYear(year)
    return Math.max(...issuesByYear.map((e) => e.number), 0) + 1
  }

  const load = async () => {
    try {
      issuesList.value = await api.load()
      sort()
    } catch (error) {
      console.log('error', error)
      errorsStore.addError({ message: error.message })
    }
  }

  load()

  const create = async (issueData) => {
    try {
      issueData.ord = getNewOrd(+issueData.year)
      const newIssue = await api.create(issueData)
      issuesList.value.unshift(newIssue)
      sort()
      return newIssue
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const update = async (issueData) => {
    try {
      const updatedIssue = await api.update(issueData)
      issuesList.value = issuesList.value.map((issue) =>
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
      sort()
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const remove = async (issueId) => {
    try {
      await api.remove(issueId)
      issuesList.value = issuesList.value.filter(
        (issue) => issue.id !== issueId
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const handleOrderChange = async (operationFunction, issue, to) => {
    try {
      const issuesByDay = getByYear(issue.year)
      const changedItems = operationFunction(issuesByDay, issue.id, to)
      for (const item of changedItems) {
        await api.update(item)
      }
      sort()
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const changeOrder = (issue, to) =>
    handleOrderChange(changeListOrder, issue, to)
  const moveToStart = (issue) => handleOrderChange(moveItemToStart, issue)
  const moveToEnd = (issue) => handleOrderChange(moveItemToEnd, issue)

  return {
    issuesList,
    getById,
    getByYear,
    getNewNumber,
    load,
    create,
    update,
    remove,
    changeOrder,
    moveToStart,
    moveToEnd,
  }
})
