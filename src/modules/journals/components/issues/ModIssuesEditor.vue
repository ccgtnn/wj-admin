<script setup>
import { computed, reactive } from 'vue'
import { useIssuesStore } from '../../stores/issues.store'
import { useIssuesTransStore } from '../../stores/issuesTrans.store'

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

const issuesStore = useIssuesStore()
const issuesTransStore = useIssuesTransStore()

// перевод на англ
const issueItemEn = computed(() =>
  issuesTransStore.getByIssueAndLang(props.issuesItem?.id, 'en'),
)

// управление модальным окном
const modal = reactive({
  isOpen: false,
  size: 'md',
})

const model = reactive({
  issue: {},
  en: {},
})

// валидация
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const rules = {
  issue: {
    name: { required },
    number: { required },
    year: { required },
  },
  en: {
    name: { required },
  },
}
const v = useVuelidate(rules, model)

// открываем форму
function open() {
  modal.isOpen = true
  v.value.$reset()

  if (props.type == 'add') {
    model.issue.name =
      '"Водное хозяйство России: проблемы, технологии, управление"'
    model.issue.year = new Date().getFullYear()
    model.issue.number = issuesStore.getNewNumber(model.issue.year)
  }
  // режим редактирования
  if (props.type == 'edit') {
    // копируем объект
    for (let key in props.issuesItem) {
      model.issue[key] = props.issuesItem[key]
    }
  }

  // перевод на англ
  if (!issueItemEn.value) {
    model.en.name =
      '"Water sector of Russia: problems, technologies, management"'

    // если режим редактирования, то не заполняем поле
    if (props.type == 'edit') model.en.name = ''

    model.en.lang = 'en'
  } else {
    // копируем объект
    for (let key in issueItemEn.value) {
      model.en[key] = issueItemEn.value[key]
    }
  }
}

async function save() {
  // валидация
  const isValid = await v.value.$validate()
  if (!isValid) return

  // запрос на сохранение
  if (props.type == 'add') {
    const newIssue = await issuesStore.create(model.issue)
    if (!newIssue) return

    // добавляем перевод
    model.en.issueId = newIssue.id
    await saveTrans(model.en)
  }
  if (props.type == 'edit') {
    await issuesStore.update(model.issue)

    // добавляем/обновляем перевод
    model.en.issueId = model.issue.id
    await saveTrans(model.en)
  }

  modal.isOpen = false
}

async function saveTrans(modelTrans) {
  // проверяем существование перевода по наличию id
  if (!modelTrans?.id) {
    await issuesTransStore.create(modelTrans)
  } else {
    await issuesTransStore.update(modelTrans)
  }
}

async function remove() {
  await issuesStore.remove(model.issue.id)
  modal.isOpen = false
}
</script>

<template>
  <div class="editor">
    <AppButton @click="open">
      {{ type == 'add' ? 'ДОБАВИТЬ ВЫПУСК' : 'РЕДАКТИРОВАТЬ' }}
    </AppButton>

    <AppModal
      :is-open="modal.isOpen"
      :size="modal.size"
      @close="modal.isOpen = false"
    >
      <template #head>
        {{ type == 'add' ? 'ДОБАВИТЬ ВЫПУСК' : 'РЕДАКТИРОВАТЬ' }}
      </template>
      <template #body>
        <div class="form">
          <div>
            <FormInput
              id="name"
              v-model="model.issue.name"
              label="Название"
              css="w-full"
            />
            <FormWarning :errors="v.issue.name.$errors" />
          </div>

          <div>
            <FormInput
              id="nameEn"
              v-model="model.en.name"
              label="Название (en)"
              css="w-full"
            />
            <FormWarning :errors="v.en.name.$errors" />
          </div>

          <div>
            <FormInput
              id="number"
              v-model="model.issue.number"
              label="Номер"
              css="w-full"
            />
            <FormWarning :errors="v.issue.number.$errors" />
          </div>

          <div>
            <FormInput
              id="year"
              v-model="model.issue.year"
              label="Год"
              css="w-full"
            />
            <FormWarning :errors="v.issue.year.$errors" />
          </div>
        </div>
      </template>
      <template #actions>
        <div class="actions">
          <AppButton @click="save">Сохранить</AppButton>
          <AppRemoveConfirm v-if="type == 'edit'" @confirm="remove">
            Подтвердите, что хотите удалить?
          </AppRemoveConfirm>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.form {
  @apply py-2 space-y-4;
}
.actions {
  @apply flex gap-4 items-center justify-between;
}
</style>
