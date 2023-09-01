import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import { issuesTransValidator, arrayIssuesTransValidator } from '../validators'
import { useErrorsStore } from '@/stores/errors.store'

export const useIssuesTransStore = defineStore('issuesTrans', () => {
  const issuesTransList = ref([])
  const errorsStore = useErrorsStore()

  const api = Api({
    API_URL: 'journal/issuesTranslation',
    validator: issuesTransValidator,
    arrayValidator: arrayIssuesTransValidator,
  })

  const getsByIssue = (issueId) =>
    issuesTransList.value.filter((issueTrans) => issueTrans.issueId === issueId)

  const getByIssueAndLang = (issueId, lang) =>
    issuesTransList.value.find(
      (issueTrans) =>
        issueTrans.issueId === issueId && issueTrans.lang === lang,
    )

  const load = async () => {
    try {
      issuesTransList.value = await api.load()
    } catch (error) {
      console.log('error', error)
      errorsStore.addError({ message: error.message })
    }
  }

  load()

  const create = async (data) => {
    try {
      const newIssueTrans = await api.create(data)
      issuesTransList.value.unshift(newIssueTrans)
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const update = async (data) => {
    try {
      const updatedIssueTrans = await api.update(data)
      issuesTransList.value = issuesTransList.value.map((issueTrans) =>
        issueTrans.id === updatedIssueTrans.id ? updatedIssueTrans : issueTrans,
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const remove = async (issueTransId) => {
    try {
      await api.remove(issueTransId)
      issuesTransList.value = issuesTransList.value.filter(
        (issueTrans) => issueTrans.id !== issueTransId,
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  return {
    issuesTransList,
    getsByIssue,
    getByIssueAndLang,
    load,
    create,
    update,
    remove,
  }
})
