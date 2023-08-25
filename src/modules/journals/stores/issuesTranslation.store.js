import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import {
  issuesTranslationValidator,
  arrayIssuesTranslationValidator,
} from '../validators'
import { useErrorsStore } from '@/stores/errors.store'

export const useIssuesTranslationStore = defineStore(
  'issuesTranslation',
  () => {
    const issuesTranslationList = ref([])
    const errorsStore = useErrorsStore()

    const api = Api({
      API_URL: 'journal/issuesTranslation',
      validator: issuesTranslationValidator,
      arrayValidator: arrayIssuesTranslationValidator,
    })

    const getsByIssue = (issueId) =>
      issuesTranslationList.value.filter(
        (issueTranslation) => issueTranslation.issueId === issueId
      )

    const getByIssueAndLang = (issueId, lang) =>
      issuesTranslationList.value.find(
        (issueTranslation) =>
          issueTranslation.issueId === issueId && issueTranslation.lang === lang
      )

    const load = async () => {
      try {
        issuesTranslationList.value = await api.load()
      } catch (error) {
        console.log('error', error)
        errorsStore.addError({ message: error.message })
      }
    }

    load()

    const create = async (data) => {
      try {
        const newIssueTranslation = await api.create(data)
        issuesTranslationList.value.unshift(newIssueTranslation)
      } catch (error) {
        errorsStore.addError({ message: error.message })
      }
    }

    const update = async (data) => {
      try {
        const updatedIssueTranslation = await api.update(data)
        issuesTranslationList.value = issuesTranslationList.value.map(
          (issueTranslation) =>
            issueTranslation.id === updatedIssueTranslation.id
              ? updatedIssueTranslation
              : issueTranslation
        )
      } catch (error) {
        errorsStore.addError({ message: error.message })
      }
    }

    const remove = async (issueTranslationId) => {
      try {
        await api.remove(issueTranslationId)
        issuesTranslationList.value = issuesTranslationList.value.filter(
          (issueTranslation) => issueTranslation.id !== issueTranslationId
        )
      } catch (error) {
        errorsStore.addError({ message: error.message })
      }
    }

    return {
      issuesTranslationList,
      getsByIssue,
      getByIssueAndLang,
      load,
      create,
      update,
      remove,
    }
  }
)
