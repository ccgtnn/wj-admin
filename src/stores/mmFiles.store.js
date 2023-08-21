import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api'
import { mmFilesValidator, arrayMmFilesValidator } from '../validators'
import { useErrorsStore } from '@/stores/errors.store'

export const useMmFilesStore = defineStore('mmFiles', () => {
  const mmFilesList = ref([])
  const errorsStore = useErrorsStore()

  const api = Api({
    API_URL: 'app/mmFile',
    scheme: mmFilesValidator,
    arrayScheme: arrayMmFilesValidator,
  })

  const getByX = (xid, xtype) =>
    mmFilesList.value.find((e) => e.xid === xid && e.xtype === xtype)

  const load = async () => {
    try {
      mmFilesList.value = await api.load()
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  load()

  const create = async (mmFileData) => {
    try {
      const newMmFile = await api.create(mmFileData)
      mmFilesList.value.unshift(newMmFile)
    } catch (error) {
      console.log(error)
      errorsStore.addError({ message: error.message })
    }
  }

  const update = async (mmFileData) => {
    try {
      const updatedMmFile = await api.update(mmFileData)
      mmFilesList.value = mmFilesList.value.map((mmFile) =>
        mmFile.id === updatedMmFile.id ? updatedMmFile : mmFile
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  const remove = async (mmFileId) => {
    try {
      await api.remove(mmFileId)
      mmFilesList.value = mmFilesList.value.filter(
        (mmFile) => mmFile.id !== mmFileId
      )
    } catch (error) {
      errorsStore.addError({ message: error.message })
    }
  }

  return {
    mmFilesList,
    getByX,
    load,
    create,
    update,
    remove,
  }
})
