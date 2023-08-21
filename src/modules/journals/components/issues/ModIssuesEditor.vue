<script setup>
import { reactive, ref } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'

const props = defineProps({
  issuesItem: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: 'add',
  },
})

// issues store
const issuesStore = useIssuesStore()

const isOpenModal = ref(false)
const model = reactive({})

// валидация
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  name: { required },
  year: { required },
}
const v = useVuelidate(rules, model)

// открываем форму
function open() {
  isOpenModal.value = true
  v.value.$reset()
  if (props.type == 'add') {
    model.name = ''
    model.year = new Date().getFullYear()
  }
  if (props.type == 'edit') {
    for (let key in props.issuesItem) {
      model[key] = props.issuesItem[key]
    }
  }
}

async function save() {
  // валидация
  const isValid = await v.value.$validate()
  if (!isValid) return

  // запрос на сохранение
  if (props.type == 'add') await issuesStore.create(model)
  if (props.type == 'edit') await issuesStore.update(model)

  isOpenModal.value = false
}

async function remove() {
  await issuesStore.remove(model.id)
  isOpenModal.value = false
}
</script>

<template>
  <div class="editor">
    <AppButton v-if="type == 'add'" @click="open">ДОБАВИТЬ ВЫПУСК</AppButton>
    <IconEdit v-if="type == 'edit'" class="editor__edit-icon" @click="open" />

    <AppModal :is-open="isOpenModal" size="md" @close="isOpenModal = false">
      <template #head>ДОБАВИТЬ ВЫПУСК</template>
      <template #body>
        <div class="form">
          <div>
            <FormInput
              id="name"
              v-model="model.name"
              label="Название"
              css="w-full"
            />
            <FormWarning :errors="v.name.$errors" />
          </div>

          <div>
            <FormInput
              id="year"
              v-model="model.year"
              label="Год"
              css="w-full"
            />
            <FormWarning :errors="v.year.$errors" />
          </div>
        </div>
      </template>
      <template #actions>
        <div class="actions">
          <AppButton @click="save">Сохранить</AppButton>
          <AppRemoveConfirm v-if="type == 'edit'" @click="remove">
            Подтвердите, что хотите удалить?
          </AppRemoveConfirm>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.editor__edit-icon {
  @apply w-4 cursor-pointer;
}
.form {
  @apply py-2 space-y-4;
}
.actions {
  @apply flex gap-4 items-center justify-between;
}
</style>
