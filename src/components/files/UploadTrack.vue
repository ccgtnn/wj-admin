<script setup>
import { transliterate } from '@/utiles'
import { ref, reactive, defineProps } from 'vue'
import { useFilesStore } from '@/stores/files.store'
import { useMmFilesStore } from '@/stores/mmFiles.store'

// Props
const props = defineProps({
  xid: {
    type: String,
    required: true,
  },
  xtype: {
    type: String,
    required: true,
  },
})

const filesStore = useFilesStore()
const mmFilesStore = useMmFilesStore()
const isOpenModal = ref(false)
const errors = ref('')
const isLoading = ref(false)
const maxSize = ref(80)
const file = ref(null)

const model = reactive({})

function init() {
  model.name = ''
  model.url = ''
  model.type = 'music'
  model.file = null
  model.xid = props.xid
  model.xtype = props.xtype

  isOpenModal.value = true
}

function handleFileUpload() {
  model.file = file.value.files[0]
  const fileName = model.file.name.split('.')
  fileName.pop()
  model.name = fileName.join('.')
  errors.value = ''
}

async function save() {
  if (model.file != null) {
    isLoading.value = true
    if (model.file.size > 1024 * 1024 * maxSize.value) {
      errors.value =
        'Файл слишком большой (' +
        (model.file.size / 1024 / 1024).toFixed(2) +
        '), допустимый рамер до ' +
        maxSize.value +
        ' мб'
    } else {
      model.size = model.file.size

      //set url
      const r1 = (Math.random() + 1).toString(36).substring(7)
      const r2 = model.file.name.split('.').pop()
      model.url = transliterate(model.name) + '-' + r1 + '.' + r2
      try {
        const filePath = await filesStore.upload(model)
        if (filePath) {
          model.url = filePath

          //создаём файл
          await filesStore.create(model)

          //связываем файл
          await mmFilesStore.create({
            xtype: model.xtype,
            xid: model.xid,
            name: model.name,
            url: model.url,
          })
        }
      } catch (error) {
        console.log(error)
      }

      isOpenModal.value = false
    }
    isLoading.value = false
  }
}
</script>

<template>
  <IconUpload class="w-4" @click="init()" />

  <AppModal :is-open="isOpenModal" size="sm">
    <template #head> ДОБАВИТЬ ТРЕК </template>

    <template #body>
      <div class="w-full mb-2">
        <p class="py-2 text-sm label">Выберите файл (.mp3, .flac)</p>
        <input
          ref="file"
          accept=".mp3, .flac"
          class="input w-full"
          name="file"
          type="file"
          @change="handleFileUpload()"
        />
      </div>

      <div v-if="model.name != ''" class="flex items-center mb-2">
        <div class="w-full">
          <p class="py-2 text-sm label">Название</p>
          <input v-model="model.name" class="input w-full" />
        </div>
      </div>

      <div v-if="errors != ''" class="alertPanel">
        {{ errors }}
      </div>
    </template>

    <template #actions>
      <div v-if="model.file" class="flex justify-between items-center">
        <div v-if="!isLoading">
          <AppButton @click="save()">Загрузить</AppButton>
        </div>
        <div v-else>Загружаем...</div>

        <div class="p-2 text-xs">
          Размер (МБ): {{ (model.file.size / 1024 / 1024).toFixed(2) }}
        </div>
      </div>
    </template>
  </AppModal>
</template>
