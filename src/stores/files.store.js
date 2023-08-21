import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import { filesValidator, arrayFilesValidator } from '../validators'
import { useErrorsStore } from '@/stores/errors.store'

export const useFilesStore = defineStore('files', () => {
  const filesList = ref([])
  const errorsStore = useErrorsStore()

  const api = Api({
    API_URL: 'app/file',
    scheme: filesValidator,
    arrayScheme: arrayFilesValidator,
  })

  const getByGenre = (genre) => filesList.value.find((e) => e.genre === genre)

  const load = async () => {
    try {
      filesList.value = await api.load()
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  load()

  const upload = async (model) => {
    if (model.file) {
      const formData = new FormData()
      formData.append('file', model.file, model.url)
      try {
        const res = await api.upload('doc', formData)
        return res.data
      } catch (error) {
        errorsStore.addError({ message: error.message })
      }
    }
  }

  const create = async (fileData) => {
    try {
      const newFile = await api.create(fileData)
      filesList.value.unshift(newFile)
    } catch (error) {
      console.log(error)
      errorsStore.addError({ message: error.message })
    }
  }

  const update = async (fileData) => {
    try {
      const updatedFile = await api.update(fileData)
      filesList.value = filesList.value.map((file) =>
        file.id === updatedFile.id ? updatedFile : file
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const remove = async (fileId) => {
    try {
      await api.remove(fileId)
      filesList.value = filesList.value.filter((file) => file.id !== fileId)
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  return {
    filesList,
    getByGenre,
    load,
    upload,
    create,
    update,
    remove,
  }
})
